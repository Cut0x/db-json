const module = require('./db-json/index');

const file = './data.json';

// Ajout d'une nouvelle entrée
module.add_entry(file, { id: 1, name: 'Martin', age: 20 });

// Modification d'une entrée existante
module.update_entry(file, 1, { name: 'Martin', age: 25 });

// Suppression d'une entrée existante
module.delete_entry(file, 1);

// Affichage des données actuelles
const data = data_module.load_data(FILE_PATH);
console.log(data);
