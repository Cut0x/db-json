const tmodule = require('./db-json/index');

const file = './data.json';

// Ajout d'une nouvelle entrée
tmodule.add_entry(file, { id: 1, name: 'Martin', age: 20 });

// Modification d'une entrée existante
tmodule.update_entry(file, 1, { name: 'Martin', age: 25 });

// Suppression d'une entrée existante
tmodule.delete_entry(file, 1);

// Affichage des données actuelles
const data = tmodule.load_data(FILE_PATH);
console.log(data);
