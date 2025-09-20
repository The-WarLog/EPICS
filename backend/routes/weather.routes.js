import express from 'express';
import { getCurrentWeatherInfoCity } from '../controllers/getCurrentWeatherInfo.js';
const weatherRoute = express.Router();


weatherRoute.get('/current-weather', getCurrentWeatherInfoCity)
//city specigic route
weatherRoute.get('/current-weather/:city', getCurrentWeatherInfoCity)




export default weatherRoute;
