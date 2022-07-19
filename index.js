import 'dotenv/config';
import {
  readInput,
  inquirerMenu,
  pause,
  listPlaces,
} from './helpers/inquirer.js';
import Searchs from './models/searchs.js';
import 'colors';

const main = async () => {
  const searchs = new Searchs();
  let opt;
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const input = await readInput('Ciudad:');
        const places = await searchs.searchCity(input);
        const id = await listPlaces(places);
        const placeSelected = places.find((place) => place.id === id);
        const weather = await searchs.placeWeather(
          placeSelected.lat,
          placeSelected.lng
        );

        console.clear();
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ', placeSelected.name.blue);
        console.log('Latitud: ', placeSelected.lat.toString().blue);
        console.log('Longitud: ', placeSelected.lng.toString().blue);
        console.log('Temperatura:', weather.temp.toString().blue);
        console.log('Mínima:', weather.min.toString().blue);
        console.log('Máxima:', weather.max.toString().blue);
        console.log('Déscripcion del clima:', weather.desc.blue);
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
