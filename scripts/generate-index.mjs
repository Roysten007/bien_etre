#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distClientDir = path.join(__dirname, 'dist/client');

// Créer un index.html basique qui charge l'app
const indexHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Serene Shift Hub</title>
    <meta name="description" content="Accompagnement holistique pour femmes - Coaching de vie personnalisé" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index-DPiz2qqQ.js"></script>
    <link rel="stylesheet" href="/assets/styles-6YTTQ0fL.css" />
  </body>
</html>`;

// Écrire le fichier
fs.writeFileSync(path.join(distClientDir, 'index.html'), indexHtml);
console.log('✓ index.html créé avec succès');
