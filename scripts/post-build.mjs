#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distClientDir = path.join(__dirname, '../dist/client');
const assetsDir = path.join(distClientDir, 'assets');

try {
  // Lire les fichiers assets générés
  const assets = fs.readdirSync(assetsDir);
  
  // Trouver le fichier CSS
  const cssFile = assets.find(f => f.startsWith('styles-') && f.endsWith('.css'));
  
  // Trouver le plus petit fichier index-*.js (c'est le client, pas le serveur)
  const jsFiles = assets.filter(f => f.startsWith('index-') && f.endsWith('.js'));
  let jsFile = null;
  let minSize = Infinity;
  for (const file of jsFiles) {
    const stat = fs.statSync(path.join(assetsDir, file));
    if (stat.size < minSize) {
      minSize = stat.size;
      jsFile = file;
    }
  }

  if (!jsFile || !cssFile) {
    throw new Error(`Assets non trouvés - JS: ${jsFile}, CSS: ${cssFile}`);
  }

  // Créer le HTML
  const indexHtml = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Serene Shift Hub - Coaching Personnel & Bien-être</title>
    <meta name="description" content="Accompagnement holistique pour femmes - Coaching de vie, séances individuelles, ateliers en groupe" />
    <meta name="theme-color" content="#2d6a4f" />
    <link rel="stylesheet" href="/assets/${cssFile}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"><\/script>
  </body>
</html>`;

  fs.writeFileSync(path.join(distClientDir, 'index.html'), indexHtml);
  console.log('✓ index.html généré avec succès');
  console.log(`  - CSS: ${cssFile}`);
  console.log(`  - JS: ${jsFile} (${(minSize / 1024).toFixed(2)} KB)`);
} catch (error) {
  console.error('✗ Erreur lors de la génération du index.html:', error.message);
  process.exit(1);
}

