var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/playlist', require('./playlist'));
router.use('/usage', require('./usage'));

module.exports = router;