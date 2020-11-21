const express = require('express');
const router = express.Router();
const playlistController = require('../../controller/playlistController');
const upload = require('../../modules/multer');

router.post('/', playlistController.createPlaylist);
router.get('/', playlistController.readAll);
