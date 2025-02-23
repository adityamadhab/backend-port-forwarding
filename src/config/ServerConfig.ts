import dotenv from 'dotenv';

dotenv.config();

export interface ServerConfig {
  defaultPort: number;
  maxPortAttempts: number;
  host: string;
}

export const config: ServerConfig = {
  defaultPort: parseInt(process.env.PORT || '3000', 10),
  maxPortAttempts: parseInt(process.env.MAX_PORT_ATTEMPTS || '100', 10),
  host: process.env.HOST || 'localhost'
}; 