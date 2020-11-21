const express = require('express');
const router = express.Router();
const usageController = require('../../controller/usageController');
const authUtils = require('../../middlewares/authUtil');
router.get('/', authUtils.checkToken, usageController.readUsageTime);

module.exports = router;
