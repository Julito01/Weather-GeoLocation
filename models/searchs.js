import { writeFileSync, readFileSync, existsSync, fstat } from 'fs';

import axios from 'axios';

class Searchs {
  history = [];
  dbPath = './db/database.json';

  constructor() {
    // TODO: leer db si existe
    this.readDB();
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY || null,
      limit: 5,
      language: 'es',
    };
  }

  get weatherParamsMapbox() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
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

  createHistory(place = '') {
    if (!this.history.includes(place)) {
      this.history.unshift(place);
    }

    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };
    writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!existsSync(this.dbPath)) return null;

    const info = readFileSync(this.dbPath, { encoding: 'utf8' });
    const data = JSON.parse(info);
    this.history = data.history;
  }
}

export default Searchs;
