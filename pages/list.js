import React, { Component } from 'react';
import Head from 'next/head';
import reduxApi from '../lib/reduxApi';
import Layout from '../components/Layout/Layout';
import StickersList from '../components/StickersList/StickersList'
import { loadStickersList } from '../lib/customReducers';

class List extends Component {
  converter = null;

  static async getInitialProps({
    store, isServer, pathname, query, router, req,
  }) {
    let { page, sort } = { page: 1, sort: 'latest', ...query };
    if (typeof page === 'string') {
      page = parseInt(page, 10);
    }
    const pageSize = 5;
    const stickersData = await store.dispatch(reduxApi.actions.stickers({
      sort,
      order: 'desc',
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }));
    const { count: itemCount, data: stickersList } = stickersData[0];
    const pageCount = Math.ceil(itemCount / pageSize);
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    store.dispatch(loadStickersList(stickersList));
    return {
      userAgent, stickersData, pageSize, page, sort, itemCount, pageCount,
    };
  }

  render() {
    return (
      <div>
        <Head>
          <title>List page</title>
          <meta name="description" content="Converter page description" />
          <script src="/static/libwebpjs.out.js" />
        </Head>
        <Layout>
          <StickersList {...this.props} />
        </Layout>
      </div>
    );
  }
}

export default List;
