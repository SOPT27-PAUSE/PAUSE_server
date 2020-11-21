const express = require('express');
const router = express.Router();
const playlistController = require('../../controller/playlistController');
const upload = require('../../modules/multer');

router.post('/', upload.single('image'), playlistController.createPlaylist);
router.get('/', playlistController.readPlaylists);

module.exports = router;
