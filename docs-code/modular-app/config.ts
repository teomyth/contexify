import { Context } from 'contexify';

/**
 * This file contains the configuration for the modular application example.
 */

// Configuration keys
export enum ConfigKeys {
  SERVER = 'config.server',
}

// Server configuration interface
export interface ServerConfig {
  port: number;
  host: string;
}

// Configure the application
export function configureApplication(app: Context) {
  // Server configuration
  app.bind(ConfigKeys.SERVER).to({
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
  });
}
