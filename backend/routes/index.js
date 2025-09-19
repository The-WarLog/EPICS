import express from 'express';
import { getCurrentWeatherInfoCity } from '../controllers/getCurrentWeatherInfo.js';
const router = express.Router();


router.get('/current-weather', getCurrentWeatherInfoCity)
//city specigic route
router.get('/current-weather/:city', getCurrentWeatherInfoCity)




export default router;
