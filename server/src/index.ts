import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import runMigrations from './db/schema.js';
import leadsRouter from './routes/leads.js';
import analyticsRouter from './routes/analytics.js';
import adminRouter from './routes/admin.js';
import contentRouter from './routes/content.js';
import aiRouter from './routes/ai.js';
import { requestLogger } from './middleware/requestLogger.js';
import { config } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);

  const isProd = config.NODE_ENV === 'production';
  let PORT = config.PORT;

  // Initialize DB
  runMigrations();
  app.use(requestLogger);

  app.use(helmet({
    contentSecurityPolicy: false, // Disabling for preview environments to work with inline scripts/styles easily
    crossOriginEmbedderPolicy: false
  }));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.use('/api/leads', leadsRouter);
  app.use('/api/analytics', analyticsRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/content', contentRouter);
  app.use('/api/ai', aiRouter);

  // Serve static client files in production, use Vite middleware in dev
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, '../../client/dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log("Server running on http://0.0.0.0:" + PORT);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} in use, trying ${PORT + 1}...`);
      PORT++;
      server.close();
      setTimeout(() => {
        server.listen(PORT, '0.0.0.0');
      }, 100);
    }
  });
}

startServer();
