const fs = require('fs');

const FILENAME = 'data.json';
const INIT_DATA = [];

function addEntry(entry) {
    const data = loadData();
    
    data.push(entry);
    saveData(data);
};

function updateEntry(id, updatedEntry) {
    const data = loadData();

    const index = data.findIndex(entry => entry.id === id);

    if (index !== -1) {
        data[index] = updatedEntry;
        saveData(data);
    };
};

function deleteEntry(id) {
    const data = loadData();

    const index = data.findIndex(entry => entry.id === id);

    if (index !== -1) {
        data.splice(index, 1);
        saveData(data);
    };
};

function getData() {
    return loadData();
};

function loadData() {
    try {
        const fileContent = fs.readFileSync(FILENAME, 'utf8');

        return JSON.parse(fileContent);
    } catch (err) {
        if (err.code === 'ENOENT') {
            initData();

            return INIT_DATA;
        } else {
            throw new TypeError(`Impossible de charger les données depuis ${FILENAME} : ${err.message}`);
        };
    };
};

function find(query) {
    const data = loadData();
    
    const found_entries = data.filter(entry => {
      for (const key in query) {
        if (entry[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
    return found_entries;
};

function saveData(data) {
    fs.writeFileSync(FILENAME, JSON.stringify(data, null, 4));
};

function initData() {
    fs.writeFileSync(FILENAME, JSON.stringify(INIT_DATA, null, 4));
};

module.exports = { addEntry, updateEntry, deleteEntry, getData, find };
