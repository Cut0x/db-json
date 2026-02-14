# db-json

A lightweight JSON file database for Node.js.

- Zero external dependency (only Node built-in modules)
- Simple API (CRUD + find + upsert)
- Single JSON file storage
- Ready for npm and GitHub Packages

## Requirements

- Node.js 18 or newer

## Installation

```bash
npm install @cut0x/db-json
```

## Quick Start

```js
const { createDb } = require("@cut0x/db-json");

const db = createDb({ file: "./users.json" });

db.insert({ id: 1, username: "alice", role: "admin" });
db.insert({ id: 2, username: "bob", role: "user" });

console.log(db.all());
console.log(db.getById(1));
```

## API

### `createDb(options?)`

Create a database instance.

Options:
- `file` (`string`, default: `"data.json"`): JSON file path.
- `idKey` (`string`, default: `"id"`): unique identifier key.
- `pretty` (`number`, default: `2`): JSON indentation size.
- `createIfMissing` (`boolean`, default: `true`): create file automatically if missing.

Returns an object with the methods below.

### `all()`

Return every record.

### `find(query)`

Filter records.

Accepted query formats:
- object match: `find({ role: "admin" })`
- predicate function: `find((row) => row.age >= 18)`

### `getById(id)`

Return one record by ID, or `null` if not found.

### `insert(entry)`

Insert a new record.

Rules:
- record must be an object
- record must include `idKey`
- ID must be unique

Throws if invalid or duplicate ID.

### `upsert(entry)`

Insert if ID does not exist, replace if it already exists.

### `updateById(id, patch)`

Patch an existing record and keep existing fields.

- Returns updated object
- Returns `null` if not found
- Throws if patch tries to change the ID

### `replaceById(id, entry)`

Replace an existing record entirely.

- Returns replacement object
- Returns `null` if not found
- Throws if `entry[idKey] !== id`

### `removeById(id)`

Delete one record.

- Returns `true` if deleted
- Returns `false` if not found

### `clear()`

Remove all records and return an empty array.

## Full Example

```js
const { createDb } = require("@cut0x/db-json");

const db = createDb({
  file: "./data/users.json",
  idKey: "id",
  pretty: 2,
  createIfMissing: true
});

// create
db.insert({ id: 1, username: "alice", age: 24, role: "admin" });

// read
console.log(db.getById(1));
console.log(db.find({ role: "admin" }));

// update
db.updateById(1, { age: 25 });

// upsert
// existing id => replace
db.upsert({ id: 1, username: "alice", age: 26, role: "owner" });
// missing id => insert
db.upsert({ id: 2, username: "bob", age: 20, role: "user" });

// delete
db.removeById(2);

console.log(db.all());
```

## Error Behavior

The module throws explicit errors for invalid usage:
- invalid `file` or `idKey`
- invalid JSON content (must be an array)
- invalid input types
- duplicate ID on `insert`
- ID mutation attempts on `updateById`

Use `try/catch` when needed:

```js
try {
  db.insert({ username: "missing-id" });
} catch (error) {
  console.error(error.message);
}
```

## TypeScript

Type definitions are included (`index.d.ts`).

```ts
import { createDb } from "@cut0x/db-json";

type User = {
  id: number;
  username: string;
  age: number;
};

const db = createDb<User>({ file: "./users.json" });
const user = db.getById(1);
```

## Tests

```bash
npm test
```

## Publish

Publication guide is available in `PACKAGE.md`.