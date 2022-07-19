import inquirer from 'inquirer';
import 'colors';

const questions = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Qué desea hacer?',
    choices: [
      { value: 1, name: `${'1.'.green} Buscar ciudad` },
      { value: 2, name: `${'2.'.green} Historial` },
      { value: 0, name: `${'0.'.green} Salir` },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('======================');
  console.log('Seleccione una opción');
  console.log('======================\n');

  const { opcion } = await inquirer.prompt(questions);
  return opcion;
};

const confirmacion = async (message) => {
  const question = [{ type: 'confirm', name: 'ok', message }];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const pause = async () => {
  const question = [
    { type: 'input', name: 'enter', message: 'Presione ENTER para continuar' },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}`;
    return {
      value: place.id,
      name: `${idx}. ${place.name}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0. Cancelar',
  });

  const selectQuestion = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione lugar:',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(selectQuestion);
  return id;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const completeQuestion = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(completeQuestion);
  return ids;
};

export { inquirerMenu, readInput, pause, listPlaces };
