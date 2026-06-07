#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distClientDir = path.join(root, 'dist/client');
const distServerDir = path.join(root, 'dist/server');
const vercelOutputDir = path.join(root, '.vercel/output');

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Nettoyer et créer .vercel/output
  if (fs.existsSync(vercelOutputDir)) {
    fs.rmSync(vercelOutputDir, { recursive: true });
  }
  fs.mkdirSync(vercelOutputDir, { recursive: true });

  // 1. Copier les assets statiques → .vercel/output/static/
  const staticDir = path.join(vercelOutputDir, 'static');
  copyDirSync(distClientDir, staticDir);
  console.log('✓ Assets statiques copiés vers .vercel/output/static/');

  // 2. Copier le serveur → .vercel/output/functions/__server.func/
  const funcDir = path.join(vercelOutputDir, 'functions/__server.func');
  copyDirSync(distServerDir, funcDir);

  // Config de la fonction serverless
  fs.writeFileSync(path.join(funcDir, '.vc-config.json'), JSON.stringify({
    runtime: 'nodejs22.x',
    handler: 'index.mjs',
    launcherType: 'Nodejs',
    shouldAddHelpers: false,
    supportsResponseStreaming: true,
  }, null, 2));
  console.log('✓ Fonction serveur copiée vers .vercel/output/functions/__server.func/');

  // 3. Créer .vercel/output/config.json
  const config = {
    version: 3,
    routes: [
      {
        src: '/assets/(.*)',
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
        continue: true,
      },
      { handle: 'filesystem' },
      { src: '/(.*)', dest: '/__server' },
    ],
  };
  fs.writeFileSync(path.join(vercelOutputDir, 'config.json'), JSON.stringify(config, null, 2));
  console.log('✓ config.json créé');

  console.log('\n✓ Build Vercel terminé — .vercel/output/ prêt au déploiement');
} catch (error) {
  console.error('✗ Erreur lors de la génération:', error.message);
  process.exit(1);
}
