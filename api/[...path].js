import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const { url = '/' } = req;
    const pathname = decodeURIComponent(url.split('?')[0]);

    // Construire le chemin complet
    let filePath = path.join(process.cwd(), 'public', pathname);
    filePath = path.normalize(filePath);

    // Vérification de sécurité
    const publicDir = path.join(process.cwd(), 'public');
    if (!filePath.startsWith(publicDir)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    // Si le fichier existe, le servir
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath);

      // Headers
      if (pathname.startsWith('/assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }

      // Content-Type
      if (pathname.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      } else if (pathname.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
      } else if (pathname.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json');
      } else if (pathname.endsWith('.jpg') || pathname.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (pathname.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (pathname.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      } else if (pathname.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
      }

      res.status(200).send(content);
      return;
    }

    // Si c'est un répertoire ou n'existe pas, servir index.html (SPA routing)
    const indexPath = path.join(publicDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.status(200).send(indexContent);
      return;
    }

    // index.html n'existe pas
    res.status(404).json({ error: 'Not Found' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
