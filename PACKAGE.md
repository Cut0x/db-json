# PACKAGE.md

Guide de publication de `@cut0x/db-json` sur GitHub Packages et npm.

## 1. Prerequis

- Node.js >= 18
- Un compte npm
- Un token GitHub avec scopes `read:packages`, `write:packages`, `repo`

## 2. Verifier le package avant publication

```bash
npm install
npm test
npm pack
```

Si tout passe, supprime le tarball genere si besoin.

## 3. Publication GitHub Packages

Important: pour GitHub Packages, le package doit etre scope (`@cut0x/db-json`), ce qui est deja configure dans `package.json`.

### 3.1 Configurer l'authentification

Cree (ou edite) `~/.npmrc`:

```ini
@cut0x:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=GITHUB_TOKEN
```

Remplace `GITHUB_TOKEN` par ton token personnel.

### 3.2 Publier

Depuis la racine du projet:

```bash
npm publish --registry=https://npm.pkg.github.com
```

Le package sera disponible sur:
- `https://github.com/Cut0x/db-json/packages`

## 4. Publication sur npm (registre public)

Si tu veux aussi publier sur npmjs.com:

### 4.1 Se connecter

```bash
npm login
```

### 4.2 Publier

```bash
npm publish --access public
```

Notes:
- Pour un package scope, `--access public` est requis au premier publish public.
- Assure-toi que le nom `@cut0x/db-json` est bien disponible sur npm.

## 5. Publier une nouvelle version

A chaque release:

```bash
npm version patch
npm publish --registry=https://npm.pkg.github.com
npm publish --access public
```

Utilise `minor` ou `major` selon le changement.

## 6. Verification post-publication

```bash
npm view @cut0x/db-json --registry=https://npm.pkg.github.com
npm view @cut0x/db-json
```

Et teste une installation dans un projet vierge:

```bash
npm install @cut0x/db-json
```