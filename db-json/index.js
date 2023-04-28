const fs = require('fs');

function loadData(file_path) {
    const data = fs.readFileSync(file_path, { encoding: 'utf8', flag: 'r' });
    try {
        return JSON.parse(data);
    } catch (err) {
        throw new TypeError(`Le fichier ${file_path} ne contient pas de données JSON valides.`);
    }
}

function saveData(file_path, data) {
    try {
        const json_data = JSON.stringify(data);
        fs.writeFileSync(file_path, json_data, { encoding: 'utf8', flag: 'w' });
    } catch (err) {
        throw new TypeError(`Impossible d'écrire les données dans le fichier ${file_path}.`);
    }
}

function addEntry(file_path, new_entry) {
    fs.access(file_path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            throw new TypeError(`Le fichier ${file_path} n'est pas accessible en lecture et/ou en écriture.`);
        } else {
            const data = loadData(file_path);

            if (!Array.isArray(data)) {
                throw new TypeError(`Le fichier ${file_path} ne contient pas un tableau JSON valide.`);
            }

            const new_id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
            new_entry.id = new_id;
            data.push(new_entry);

            saveData(file_path, data);
        }
    });
}

function updateEntry(file_path, updated_entry) {
    fs.access(file_path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            throw new TypeError(`Le fichier ${file_path} n'est pas accessible en lecture et/ou en écriture.`);
        } else {
            const data = loadData(file_path);

            if (!Array.isArray(data)) {
                throw new TypeError(`Le fichier ${file_path} ne contient pas un tableau JSON valide.`);
            }

            const index = data.findIndex(entry => entry.id === updated_entry.id);

            if (index !== -1) {
                data[index] = updated_entry;
                saveData(file_path, data);
            } else {
                throw new TypeError(`L'entrée avec l'ID ${updated_entry.id} n'existe pas dans le fichier ${file_path}.`);
            }
        }
    });
}

function deleteEntry(file_path, entry_id) {
    fs.access(file_path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            throw new TypeError(`Le fichier ${file_path} n'est pas accessible en lecture et/ou en écriture.`);
        } else {
            const data = loadData(file_path);

            if (!Array.isArray(data)) {
                throw new TypeError(`Le fichier ${file_path} ne contient pas un tableau JSON valide.`);
            }

            const index = data.findIndex(entry => entry.id === entry_id);

            if (index !== -1) {
                data.splice(index, 1);
                saveData(file_path, data);
            } else {
                throw new TypeError(`L'entrée avec l'ID ${entry_id} n'existe pas dans le fichier ${file_path}.`);
            }
        }
    });
}

module.exports = { loadData, addEntry, updateEntry, deleteEntry };