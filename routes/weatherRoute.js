const express = require('express');
const weatherController = require('../controllers/weatherController');

const router = express.Router();

router.post('/getWeather', weatherController.getWeather);
router.post('/sendWeatherToEmail', weatherController.sendWeatherToEmail);


module.exports = router;
