#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distClientDir = path.join(__dirname, '../dist/client');
const assetsDir = path.join(distClientDir, 'assets');
const publicDir = path.join(__dirname, '../public');

try {
  // S'assurer que le répertoire public existe
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Créer le répertoire public/assets
  const publicAssetsDir = path.join(publicDir, 'assets');
  if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
  }

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

  // Copier les assets vers public/assets
  for (const file of assets) {
    const srcPath = path.join(assetsDir, file);
    const destPath = path.join(publicAssetsDir, file);
    fs.copyFileSync(srcPath, destPath);
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

  fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);
  console.log('✓ Build terminé avec succès');
  console.log(`  - index.html créé`);
  console.log(`  - Assets copiés (CSS: ${cssFile}, JS: ${jsFile})`);
  console.log(`  - Prêt pour Vercel!`);
} catch (error) {
  console.error('✗ Erreur lors de la génération:', error.message);
  process.exit(1);
}


