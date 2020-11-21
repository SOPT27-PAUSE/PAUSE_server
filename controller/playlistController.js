const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { Playlist } = require('../models');
const upload = multer({
    dest: 'upload/'
})

module.exports = {
    createPlaylist: async (req, res) => {
        try {
            const { image } = req.file;
            const { uri, category, title, playtime } = req.body;

            if(!uri || !category || !image || !title || !playtime) {
                res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            }

            const playlist = await Playlist.create({
                uri: uri,
                category: category,
                image: image,
                title: title,
                playtime: playtime,
            });

            console.log(playlist);
            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.PLAYLIST_CREATE_SUCCESS));
        } catch(error) {
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.PLAYLIST_CREATE_FAIL));
        }
    }
}