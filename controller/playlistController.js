const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { Op } = require('sequelize');

const { Playlist } = require('../models');

module.exports = {
    createPlaylist: async (req, res) => {
        try {
            const image = req.file.location;
            const { url, category, title, playtime, count } = req.body;


            if(!url || !category  || !title || !image || !playtime ||!count) {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            }

            const playlist = await Playlist.create({
                url: url,
                category: category,
                image: image,
                title: title,
                playtime: playtime,
                count: count,
            });

            console.log(playlist);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.PLAYLIST_CREATE_SUCCESS));
        } catch(error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.PLAYLIST_CREATE_FAIL));
        }
    },
    readPlaylists: async (req, res) => {
        try {
            const {playtime, category} = req.query;
            console.log(playtime);
            console.log(category);

            if(!playtime || !category) {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            }

            const playlists = await Playlist.findAll({
                where: {
                    playtime: { [Op.lte]: [playtime]},
                    category: category,
                },
                order: [['playtime',  'DESC']]
            })
            console.log(playlists);

            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.PLAYLIST_READ_SUCCESS, playlists));
        } catch(error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.PLAYLIST_READ_FAIL));
        }
    }
}