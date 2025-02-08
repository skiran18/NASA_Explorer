const express = require('express');
const router = express.Router();
const neoController = require('../controllers/neoController');


router.route("/").get(neoController.getNEO)

module.exports = router;