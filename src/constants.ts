import { Config } from './types/config.js';

export const DEFAULT_CONFIG: Config = {
  files: [
    {
      source: './templates/.env.template',
      destination: './public_html/.env'
    },
    {
      source: './templates/.env.template',
      destination: './public_html/.env.example'
    }
  ]
};
