const fs = require('fs');

function load_data(file_path) {
    try {
        const data = fs.readFileSync(file_path);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveData(file_path, data) {
    fs.writeFileSync(file_path, JSON.stringify(data));
}

function add_entry(file_path, new_entry) {
    const data = load_data(file_path);
    data.push(new_entry);
    saveData(file_path, data);
}

function update_entry(file_path, entry_id, updated_entry) {
    const data = load_data(file_path);
    const index = data.findIndex(entry => entry.id === entry_id);
    if (index !== -1) {
        data[index] = { ...data[index], ...updated_entry };
        saveData(file_path, data);
    }
}

function delete_entry(file_path, entry_id) {
    const data = load_data(file_path);
    const index = data.findIndex(entry => entry.id === entry_id);
    if (index !== -1) {
        data.splice(index, 1);
        saveData(file_path, data);
    }
}

module.exports = { load_data, add_entry, update_entry, delete_entry };
