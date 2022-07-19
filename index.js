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
        const places = await searchs.city(input);
        const id = await listPlaces(places);
        const placeSelected = places.find((place) => place.id === id);
        console.log(placeSelected);

        await searchs.city(input);
        console.log(input);
        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ', placeSelected.name.blue);
        console.log('Latitud: ', placeSelected.lat.toString().blue);
        console.log('Longitud: ', placeSelected.lng.toString().blue);
        console.log('Temperatura:');
        console.log('Mínima:');
        console.log('Máxima:');
        break;
    }

    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
