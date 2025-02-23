import express, { Application, Request, Response } from 'express';
import { config } from './config/ServerConfig';
import { PortManager } from './services/PortManager';
import logger from './logger/log';

const app: Application = express();
const portManager = PortManager.getInstance();

async function startServer() {
  try {
    const port = await portManager.allocatePort(config.defaultPort);
    
    if (!port) {
      logger.error('No available ports found after maximum attempts');
      process.exit(1);
    }

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello from Express & TypeScript!');
    });

    app.get('/ports', (req: Request, res: Response) => {
      const activePorts = portManager.getActivePorts();
      logger.info(`Active ports requested: ${JSON.stringify(activePorts)}`);
      res.json({ activePorts });
    });

    const server = app.listen(port, () => {
      logger.info(`Server is running on http://${config.host}:${port}`);
      logger.info(`Original desired port: ${config.defaultPort}`);
      if (port !== config.defaultPort) {
        logger.warn(`Port ${config.defaultPort} was busy, forwarded to port ${port}`);
      }
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('Received SIGTERM signal. Shutting down gracefully...');
      server.close(() => {
        portManager.releasePort(port);
        logger.info(`Released port ${port}`);
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('Received SIGINT signal. Shutting down gracefully...');
      server.close(() => {
        portManager.releasePort(port);
        logger.info(`Released port ${port}`);
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Log when the application starts
logger.info('Starting server...');
startServer();
