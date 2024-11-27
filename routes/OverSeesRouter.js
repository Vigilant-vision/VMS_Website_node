const express = require('express');
const router = express.Router();
const { OverseesSignin,GetTrackerData } = require('../controllers/OverSeesController');

router.get('/login', OverseesSignin);
router.get('/track-data', GetTrackerData);


module.exports = router;
