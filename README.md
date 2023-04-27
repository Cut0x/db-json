# Module de gestion de données JSON
Ce module Node.js permet de stocker, modifier et supprimer des données dans un fichier JSON.

## Installation
Pour installer ce module, vous pouvez utiliser NPM :

```
npm install
```

## Utilisation
Pour utiliser ce module, vous devez d'abord l'importer dans votre code :

```js
const data_module = require('./data_module');
```
Ensuite, vous pouvez appeler les fonctions fournies pour stocker, modifier et supprimer des données dans le fichier JSON.

# `load_data(file_path`)`
Cette fonction permet de charger les données existantes à partir du fichier JSON spécifié.

```js
const data = data_module.load_data('./data.json');
console.log(data);
```

# `add_entry(file_path, new_entry)`
Cette fonction permet d'ajouter une nouvelle entrée à la liste des données stockées dans le fichier JSON spécifié.

```js
data_module.add_entry('./data.json', { id: 1, name: 'John Doe', age: 30 });
```

# `update_entry(file_path, entry_id, updated_entry)`
Cette fonction permet de modifier une entrée existante dans la liste des données stockées dans le fichier JSON spécifié.


```js
data_module.update_entry('./data.json', 1, { name: 'Jane Doe', age: 35 });
```

# `delete_entry(file_path, entry_id)`
Cette fonction permet de supprimer une entrée existante de la liste des données stockées dans le fichier JSON spécifié.

```js
data_module.delete_entry('./data.json', 1);
```

# Exemple complet
Voici un exemple complet d'utilisation de ce module pour stocker, modifier et supprimer des données dans un fichier JSON :

```js
const data_module = require('./data_module');

const FILE_PATH = './data.json';

// Ajout d'une nouvelle entrée
data_module.add_entry(FILE_PATH, { id: 1, name: 'Martin', age: 20 });

// Modification d'une entrée existante
data_module.update_entry(FILE_PATH, 1, { name: 'Martin', age: 25 });

// Suppression d'une entrée existante
data_module.delete_entry(FILE_PATH, 1);

// Affichage des données actuelles
const data = data_module.load_data(FILE_PATH);
console.log(data);
```

## Contributeurs
Module proposé par <a href="https://twitter.com/Cut0x">Cut0x</a>
