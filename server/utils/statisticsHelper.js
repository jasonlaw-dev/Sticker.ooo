const uuidv4 = require('uuid/v4');
const { body } = require('express-validator/check');
const bluebird = require('bluebird');
const moment = require('moment');
const _ = require('lodash');
const Sticker = require('../models/Sticker');
const StickerStat = require('../models/StickerStat');
const { getRedisClient } = require('../utils/redis');

const client = bluebird.promisifyAll(getRedisClient());

const persistInterval = 1000 * 60 * 1; // 1 min
// const persistInterval = 1000 * 10; // 10 sec

const siteStatsFields = ['packs', 'stickers'];
const stickerStatsFields = ['downloads', 'views'];

const getSiteStatsKey = sharingType => `stats:sticker:${sharingType}`;
const getStickerStatsKey = uuid => `stats:sticker:${uuid}`;

const getSiteStatsFromDB = async () => {
  const stats = await Sticker.aggregate([
    {
      $group: {
        _id: '$sharingType',
        packs: { $sum: '$stats.packs' },
        stickers: { $sum: '$stats.stickers' },
      },
    },
    { $addFields: { sharingType: '$_id' } },
    { $project: { _id: 0 } },
  ]);
  return stats;
};

const saveSiteStatsToRedis = async (stats) => {
  const promises = stats
    .filter(stat => stat.sharingType != null)
    .map(stat => client.hmsetAsync(getSiteStatsKey(stat.sharingType), stat));
  return Promise.all(promises);
};

const getSiteStats = async () => {
  const sharingTypes = ['public', 'link', 'private'];
  const promises = sharingTypes
    .map(async (sharingType) => {
      const key = getSiteStatsKey(sharingType);
      return _.zipObject(siteStatsFields, (await client.hmgetAsync(key, siteStatsFields)).map(v => parseInt(v, 10) || 0));
    });
  return _.zipObject(sharingTypes, await Promise.all(promises));
};

const persistSiteStats = async () => {
  const stats = await getSiteStatsFromDB();
  await saveSiteStatsToRedis(stats);
};

const incrementSiteStats = async (sharingType, field, increment) => {
  if (!siteStatsFields.includes(field)) {
    throw new Error('Invalid field');
  }
  const key = getSiteStatsKey(sharingType);
  return client.hincrbyAsync(key, field, increment);
};

const init = async () => {
  await persistSiteStats();
  setInterval(() => persistSiteStats(), persistInterval);
};

const getIndividualStatsByPeriod = async (uuid, periodName, days) => {
  const endDate = moment();
  const startDate = endDate.clone().add(-days, 'day');
  const stats = await StickerStat.aggregate([
    { $match: { uuid, time: { $gte: startDate.toDate(), $lte: endDate.toDate() } } },
    { $group: { _id: '$uuid', [`${periodName}Downloads`]: { $sum: '$downloads' }, [`${periodName}Views`]: { $sum: '$views' } } },
    { $project: { _id: 0 }},
  ]);
  return stats[0];
};

const getStickerStatsGrouped = async (uuid) => {
  const periods = {
    daily: 1,
    weekly: 7,
    monthly: 14,
    yearly: 365,
  };
  const results = await Promise.all(Object.keys(periods)
    .map(period => getIndividualStatsByPeriod(uuid, period, periods[period])));
  if (results) {
    const merged = Object.assign({}, ...results);
    return merged;
  }
  return null;
};

const getCachedStickerStatsToUpdate = async (uuid) => {
  const key = getStickerStatsKey(uuid);
  const values = (await client.hmgetAsync(key, stickerStatsFields)).map(str => parseInt(str, 10) || 0);
  return _.zipObject(stickerStatsFields, values);
};

const persistStickerStats = async (uuid) => {
  const key = getStickerStatsKey(uuid);
  const lastPersist = parseInt(await client.hgetAsync(key, 'lastPersist'), 10) || 0;
  const now = Date.now();
  if (lastPersist <= now - persistInterval) {
    await client.hsetAsync(key, 'lastPersist', now);
    const { downloads, views } = await getCachedStickerStatsToUpdate(uuid);
    const stickerStat = new StickerStat({
      uuid, time: new Date(now), downloads, views,
    });
    await stickerStat.save();
    await Promise.all([
      client.hincrbyAsync(key, 'downloads', -downloads),
      client.hincrbyAsync(key, 'views', -views),
    ]);

    const statsToSave = await getStickerStatsGrouped(uuid);
    const sticker = await Sticker.findOne({ uuid });
    if (sticker && statsToSave) {
      sticker.stats = { ...sticker.stats, ...statsToSave };
      await sticker.save();
    }
  }
};

const incrementStickerStats = async (uuid, field) => {
  if (!stickerStatsFields.includes(field)) {
    throw new Error('Invalid field');
  }
  const key = getStickerStatsKey(uuid);
  await client.hincrbyAsync(key, field, 1);
  await client.hsetAsync(key, 'lastUpdate', Date.now());
  setTimeout(() => persistStickerStats(uuid), persistInterval);
};

module.exports = {
  init,
  getSiteStats,
  incrementSiteStats,
  getStickerStatsGrouped,
  incrementStickerStats,
};