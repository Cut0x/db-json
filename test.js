const { loadData, addEntry, updateEntry, deleteEntry } = require('./db-json/index');
const file = './data.json';

// Ajout d'une nouvelle entrée
console.log('Avant l\'ajout :');
console.log(loadData(file));
addEntry(file, { id: 1, name: 'Martin', age: 20 });
console.log('Après l\'ajout :');
console.log(loadData(file));

// Modification d'une entrée existante
console.log('Avant la modification :');
console.log(loadData(file));
updateEntry(file, 1, { name: 'Martin', age: 25 });
console.log('Après la modification :');
console.log(loadData(file));

// Suppression d'une entrée existante
console.log('Avant la suppression :');
console.log(loadData(file));
deleteEntry(file, 1);
console.log('Après la suppression :');
console.log(loadData(file));