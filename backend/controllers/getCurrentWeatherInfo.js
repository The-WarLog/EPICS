const baseurl = "https://api.openweathermap.org/data/2.5/weather";
const apikey = process.env.API_KEY || "9a0157d7516add71c914fe0c841955c1";

async function fetchcurrent(url, city) {
   
    const urlapi = `${url}?q=${city}&appid=${apikey}&units=metric`;
    const info = await fetch(urlapi);
    return info.json();
}

const buildUrl = (baseUrl) => {
    const url = new URL(baseUrl);
    //console.log(url.toString());
    return url.toString();
};

exports.getCurrentWeatherInfoCity = async (req, res) => {
    const city = req.params.city || req.query.city || "Sehore"
    try {
        
        const weatherData = await fetchcurrent(baseurl, city);
        const{main, wind ,sys} = weatherData
       //filtered data
      const filteredData = {
            temperature: main.temp,
            feels_like: main.feels_like,
            temp_min: main.temp_min,
            temp_max: main.temp_max,
            pressure: main.pressure,
            humidity: main.humidity,
            wind_speed: wind.speed,
            wind_direction: wind.deg,
            country: sys.country,
            sunrise: sys.sunrise,
            sunset: sys.sunset,
            city: weatherData.name
        }
        return res.json(filteredData);
    } catch (error) {
        console.log(`Unable to Fetch: ${error}`);
        // Added proper error response
        return res.status(500).json({ 
            error: "Failed to fetch weather data",
            message: error.message 
        });
    }
}
