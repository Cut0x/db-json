# 📦 Module de gestion de données JSON
Ce module Node.js permet de stocker, modifier et supprimer des données dans un fichier JSON.

# 📥 Installation
Pour installer ce module, vous pouvez utiliser NPM :

```
npm install
```
***⚠️ Pas encore disponible !**
  
# ✏️ Utilisation
> Pour utiliser ce module, vous devez d'abord l'importer dans votre code :

```js
const db = require('./db-json');
```
> Ensuite, vous pouvez appeler les fonctions fournies pour stocker, modifier et supprimer des données dans le fichier JSON.
  
  
## 📜 `getData()`
> Cette fonction permet de charger les données existantes à partir du fichier JSON spécifié.
  
```js
console.log(db.getData());
```
  
  
## 📜 `addEntry(new_entry)`
> Cette fonction permet d'ajouter une nouvelle entrée à la liste des données stockées dans le fichier JSON spécifié.
  
```js
db.addEntry({ id: 1, name: 'Martin', age: 20 });
```
  
  
## 📜 `updateEntry(entry_id, updated_entry)`
> Cette fonction permet de modifier une entrée existante dans la liste des données stockées dans le fichier JSON spécifié.
  
```js
db.updateEntry(1, { name: 'Martin', age: 25 });
```
  
  
## 📜 `deleteEntry(entry_id)`
> Cette fonction permet de supprimer une entrée existante de la liste des données stockées dans le fichier JSON spécifié.
  
```js
db.deleteEntry(1);
```
  
  
# 🧪 Exemple complet
Voici un exemple complet d'utilisation de ce module pour stocker, modifier et supprimer des données dans un fichier JSON :
  
```js
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
```
  
## Contributeurs
Module proposé par <a href="https://twitter.com/Cut0x">Cut0x</a>
