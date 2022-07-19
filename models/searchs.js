import axios from 'axios';

class Searchs {
  history = ['Tegucigalpa', 'Madrid', 'San José'];

  constructor() {
    // TODO: leer db si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY || null,
      limit: 5,
      language: 'es',
    };
  }

  async searchCity(place = '') {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });
      const res = await instance.get();
      return res.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (e) {
      return [];
    }
  }

  // Params
  // lat=-37.01667&lon=-57.13333&appid=beb7d0d4c826b08d3ee2c60ab3c04080&units=metric&lang=es

  get weatherParamsMapbox() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  async placeWeather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
        params: { ...this.weatherParamsMapbox, lat, lon },
      });
      const res = await instance.get();
      const { weather, main } = res.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (e) {
      console.log(e);
    }
  }
}

export default Searchs;
