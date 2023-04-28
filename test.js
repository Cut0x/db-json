const db = require('./db-json');

// Ajouter une entrée
db.addEntry({ id: 1, name: 'Alice' });

// Obtenir les données
console.log(db.getData());

// Mettre à jour une entrée
db.updateEntry(1, { id: 1, name: 'Bob' });

// Supprimer une entrée
db.deleteEntry(1);

// Obtenir les données
console.log(db.getData());