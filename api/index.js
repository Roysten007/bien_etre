import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '../dist/client');

export default async function handler(req, res) {
  try {
    const url = req.url || '/';
    const filePath = path.join(distDir, url.split('?')[0]);
    const normalizedPath = path.normalize(filePath);

    // Vérifier que le chemin est dans le répertoire dist
    if (!normalizedPath.startsWith(distDir)) {
      res.status(403).send('Forbidden');
      return;
    }

    // Si c'est un fichier statique qui existe
    if (fs.existsSync(normalizedPath) && fs.statSync(normalizedPath).isFile()) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.sendFile(normalizedPath);
      return;
    }

    // Pour toutes les autres routes, servir index.html (SPA behavior)
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    const indexPath = path.join(distDir, 'index.html');
    res.sendFile(indexPath);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
