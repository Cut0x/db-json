"use strict";

const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_OPTIONS = {
  file: "data.json",
  idKey: "id",
  pretty: 2,
  createIfMissing: true
};

function createDb(options = {}) {
  const config = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  if (typeof config.file !== "string" || config.file.trim() === "") {
    throw new TypeError("`file` doit être une chaîne non vide.");
  }

  if (typeof config.idKey !== "string" || config.idKey.trim() === "") {
    throw new TypeError("`idKey` doit être une chaîne non vide.");
  }

  const filePath = path.resolve(process.cwd(), config.file);

  function ensureFile() {
    if (!fs.existsSync(filePath)) {
      if (!config.createIfMissing) {
        throw new Error(`Fichier introuvable: ${filePath}`);
      }
      fs.writeFileSync(filePath, "[]\n", "utf8");
    }
  }

  function read() {
    ensureFile();
    const raw = fs.readFileSync(filePath, "utf8").trim();

    if (raw === "") {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new TypeError("Le contenu JSON doit être un tableau.");
    }

    return parsed;
  }

  function write(data) {
    if (!Array.isArray(data)) {
      throw new TypeError("Les données à écrire doivent être un tableau.");
    }

    const tmpPath = `${filePath}.tmp`;
    const json = `${JSON.stringify(data, null, config.pretty)}\n`;

    fs.writeFileSync(tmpPath, json, "utf8");
    fs.renameSync(tmpPath, filePath);
    return data;
  }

  function all() {
    return read();
  }

  function find(query) {
    const data = read();

    if (typeof query === "function") {
      return data.filter(query);
    }

    if (query && typeof query === "object" && !Array.isArray(query)) {
      return data.filter((entry) =>
        Object.keys(query).every((key) => entry[key] === query[key])
      );
    }

    throw new TypeError("`find` attend un objet de filtre ou une fonction.");
  }

  function getById(id) {
    const data = read();
    return data.find((entry) => entry[config.idKey] === id) || null;
  }

  function insert(entry) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new TypeError("`insert` attend un objet.");
    }

    if (!(config.idKey in entry)) {
      throw new TypeError(`L'objet doit contenir la clé '${config.idKey}'.`);
    }

    const data = read();
    const id = entry[config.idKey];

    if (data.some((item) => item[config.idKey] === id)) {
      throw new Error(`Une entrée avec ${config.idKey}=${id} existe déjà.`);
    }

    data.push(entry);
    write(data);
    return entry;
  }

  function upsert(entry) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new TypeError("`upsert` attend un objet.");
    }

    if (!(config.idKey in entry)) {
      throw new TypeError(`L'objet doit contenir la clé '${config.idKey}'.`);
    }

    const data = read();
    const id = entry[config.idKey];
    const index = data.findIndex((item) => item[config.idKey] === id);

    if (index === -1) {
      data.push(entry);
    } else {
      data[index] = entry;
    }

    write(data);
    return entry;
  }

  function updateById(id, patch) {
    if (!patch || typeof patch !== "object" || Array.isArray(patch)) {
      throw new TypeError("`updateById` attend un objet patch.");
    }

    const data = read();
    const index = data.findIndex((entry) => entry[config.idKey] === id);

    if (index === -1) {
      return null;
    }

    const next = {
      ...data[index],
      ...patch
    };

    if (next[config.idKey] !== id) {
      throw new Error(`La clé '${config.idKey}' ne peut pas être modifiée.`);
    }

    data[index] = next;
    write(data);
    return next;
  }

  function replaceById(id, entry) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new TypeError("`replaceById` attend un objet.");
    }

    if (entry[config.idKey] !== id) {
      throw new Error(`L'objet doit contenir '${config.idKey}' égal à ${id}.`);
    }

    const data = read();
    const index = data.findIndex((item) => item[config.idKey] === id);

    if (index === -1) {
      return null;
    }

    data[index] = entry;
    write(data);
    return entry;
  }

  function removeById(id) {
    const data = read();
    const index = data.findIndex((entry) => entry[config.idKey] === id);

    if (index === -1) {
      return false;
    }

    data.splice(index, 1);
    write(data);
    return true;
  }

  function clear() {
    write([]);
    return [];
  }

  return {
    filePath,
    all,
    find,
    getById,
    insert,
    upsert,
    updateById,
    replaceById,
    removeById,
    clear
  };
}

module.exports = {
  createDb
};