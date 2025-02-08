const express = require('express');
const router = express.Router();
const marsController = require('../controllers/marsController');


router.route("/").get(marsController.getMarsPictures)
router.route("/:camType").get(marsController.filterCameraType);

module.exports = router;