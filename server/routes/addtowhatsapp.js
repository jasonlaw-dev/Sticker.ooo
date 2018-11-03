'use strict';

const mongooseCrudify = require('mongoose-crudify');

const helpers = require('../services/helpers');
const Sticker = require('../models/Sticker');

module.exports = function (server) {

    // Docs: https://github.com/ryo718/mongoose-crudify
    server.use(
        '/api/addtowhatsapp/',
        mongooseCrudify({
            Model: Sticker,
            identifyingKey: 'uuid',
            selectFields: '-__v -_id', // Hide '__v' property

            endResponseInAction: true,
            actions: {
                // default actions: list, create, read, update, delete
                // any non-overridden action will be in functional
                // store query result or err in req.crudify
                // auto calling next() if after actions defined for this action

                // override read
                read: (req, res) => {
                    console.log(req.query.chunk);
                    let newJson = {
                        identifier: req.crudify.sticker.uuid + "_chunk" + [req.query.chunk],
                        name: req.crudify.sticker.name,
                        publisher: req.crudify.sticker.publisher,
                        tray_image: formatBase64(req.crudify.sticker.tray[req.query.chunk], 'png'),
                        stickers: req.crudify.sticker.stickers[req.query.chunk].map(item => ({
                            image_data: formatBase64(item, 'webp'),
                        })),
                    }
                    res.json( newJson );
                }
            },
            afterActions: [
                { middlewares: [] },
            ],

        })
    );

    function formatBase64 (string, type){
        if (type == 'png')
            return string.replace('data:image/png;base64,', '')
        if (type == 'webp')
            return string.replace('data:image/webp;base64,', '')
    }

};
