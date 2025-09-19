var express = require('express');
const { getCurrentWeatherInfoCity } = require('../controllers/getCurrentWeatherInfo');
var router = express.Router();


router.get('/current-weather',getCurrentWeatherInfoCity)
//city specigic route
router.get('/current-weather/:city',getCurrentWeatherInfoCity)




module.exports = router;
