"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { createDb } = require("./index");

function setup() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "db-json-"));
  const file = path.join(tmpDir, "data.json");
  const db = createDb({ file });
  return { tmpDir, file, db };
}

test("insert + all + getById", () => {
  const { db } = setup();

  db.insert({ id: 1, name: "Alice" });
  db.insert({ id: 2, name: "Bob" });

  assert.equal(db.all().length, 2);
  assert.deepEqual(db.getById(2), { id: 2, name: "Bob" });
});

test("updateById patch partiel", () => {
  const { db } = setup();

  db.insert({ id: 1, name: "Alice", age: 20 });
  const updated = db.updateById(1, { age: 21 });

  assert.deepEqual(updated, { id: 1, name: "Alice", age: 21 });
});

test("upsert insere puis remplace", () => {
  const { db } = setup();

  db.upsert({ id: 1, name: "A" });
  db.upsert({ id: 1, name: "B" });

  assert.deepEqual(db.all(), [{ id: 1, name: "B" }]);
});

test("find avec objet", () => {
  const { db } = setup();

  db.insert({ id: 1, role: "admin" });
  db.insert({ id: 2, role: "user" });
  db.insert({ id: 3, role: "admin" });

  assert.equal(db.find({ role: "admin" }).length, 2);
});

test("removeById et clear", () => {
  const { db } = setup();

  db.insert({ id: 1, name: "Alice" });
  db.insert({ id: 2, name: "Bob" });

  assert.equal(db.removeById(2), true);
  assert.equal(db.removeById(3), false);
  assert.deepEqual(db.all(), [{ id: 1, name: "Alice" }]);

  db.clear();
  assert.deepEqual(db.all(), []);
});