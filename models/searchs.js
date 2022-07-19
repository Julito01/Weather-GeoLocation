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

  async city(place = '') {
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
}

export default Searchs;
