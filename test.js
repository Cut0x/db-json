const tmodule = require('./db-json/index');
const file = './data.json';

// Ajout d'une nouvelle entrée
console.log('Avant l\'ajout :');
console.log(tmodule.load_data(file));
tmodule.add_entry(file, { id: 1, name: 'Martin', age: 20 });
console.log('Après l\'ajout :');
console.log(tmodule.load_data(file));

// Modification d'une entrée existante
console.log('Avant la modification :');
console.log(tmodule.load_data(file));
tmodule.update_entry(file, 1, { name: 'Martin', age: 25 });
console.log('Après la modification :');
console.log(tmodule.load_data(file));

// Suppression d'une entrée existante
console.log('Avant la suppression :');
console.log(tmodule.load_data(file));
tmodule.delete_entry(file, 1);
console.log('Après la suppression :');
console.log(tmodule.load_data(file));