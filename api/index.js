import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, '../dist/client');
const indexPath = path.join(clientDir, 'index.html');

export default function handler(req, res) {
  try {
    const urlPath = req.url.split('?')[0];
    const filePath = path.join(clientDir, urlPath);
    const normalizedPath = path.normalize(filePath);

    // Vérifier que le chemin est dans le répertoire client
    if (!normalizedPath.startsWith(clientDir)) {
      res.status(403).send('Forbidden');
      return;
    }

    // Si c'est un fichier statique qui existe
    if (fs.existsSync(normalizedPath) && fs.statSync(normalizedPath).isFile()) {
      // Ajouter les headers de cache pour les assets
      if (urlPath.startsWith('/assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
      res.sendFile(normalizedPath);
      return;
    }

    // Pour toutes les autres routes, servir index.html (SPA routing)
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(indexPath);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


