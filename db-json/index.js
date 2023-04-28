const fs = require('fs');

function load_data(file_path) {
    fs.access(file_path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            throw new TypeError(`Le fichier ${file} n'est pas accessible en lecture et/ou en écriture.`);
        } else {
            try {
                const data = fs.readFileSync(file_path);
                return JSON.parse(data);
            } catch (error) {
                return [];
            };
        };
    });
};

function saveData(file_path, data) {
    fs.access(file_path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            throw new TypeError(`Le fichier ${file} n'est pas accessible en lecture et/ou en écriture.`);
        } else {
            fs.writeFileSync(file_path, JSON.stringify(data));
        };
    });
};

function add_entry(file_path, new_entry) {
    fs.access(file_path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            throw new TypeError(`Le fichier ${file} n'est pas accessible en lecture et/ou en écriture.`);
        } else {
            let data = load_data(file_path);
            if (!data) {
                data = [];
            };
            data.push(new_entry);
            saveData(file_path, data);
        };
    });
};

function update_entry(file_path, entry_id, updated_entry) {
    fs.access(file_path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            throw new TypeError(`Le fichier ${file} n'est pas accessible en lecture et/ou en écriture.`);
        } else {
            let data = load_data(file_path);

            if (!data) {
                data = [];
            };

            const index = data.findIndex(entry => entry.id === entry_id);

            if (index !== -1) {
                data[index] = { ...data[index], ...updated_entry };
                saveData(file_path, data);
            };
        };
    });
};

function delete_entry(file_path, entry_id) {
    fs.access(file_path, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) {
            throw new TypeError(`Le fichier ${file} n'est pas accessible en lecture et/ou en écriture.`);
        } else {
            const data = load_data(file_path);
            console.log("Loaded data:", data);
            const index = data.findIndex(entry => entry.id === entry_id);

            if (index !== -1) {
                data.splice(index, 1);
                saveData(file_path, data);
            };
        };
    });
};

module.exports = { load_data, add_entry, update_entry, delete_entry };
