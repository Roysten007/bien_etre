import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

export default function handler(req, res) {
  try {
    const { url = '/' } = req;
    const pathname = decodeURIComponent(url.split('?')[0]);

    // Construction du chemin du fichier
    let filePath = path.join(publicDir, pathname);
    filePath = path.normalize(filePath);

    // Vérification de sécurité - s'assurer qu'on reste dans publicDir
    if (!filePath.startsWith(publicDir)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    // Si le fichier existe, le servir
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath);

      // Headers de cache
      if (pathname.startsWith('/assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (pathname.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }

      // Content-Type approprié
      const ext = path.extname(pathname).toLowerCase();
      const contentTypes = {
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json',
        '.html': 'text/html; charset=utf-8',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.webp': 'image/webp',
      };
      
      const contentType = contentTypes[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);
      res.status(200).send(content);
      return;
    }

    // Si le fichier n'existe pas, servir index.html (SPA routing)
    const indexPath = path.join(publicDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.status(200).send(indexContent);
      return;
    }

    // index.html n'existe pas - erreur critique
    res.status(500).json({ 
      error: 'Missing index.html',
      details: `index.html not found at ${indexPath}`
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error.message 
    });
  }
}
