import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';
import { Config } from '../types/config.js';
import { Printer } from '../utils/logger.js';
import { existsSync, writeFileSync } from 'fs';
import { DEFAULT_CONFIG } from '../constants.js';

/**
 * Asynchronously ask a question in the console.
 * @param query - The question to ask
 * @returns The user's answer
 */
function askQuestion(query: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    })
  );
}

/**
 * Reads the configuration file and returns the parsed configuration object.
 * @param configPath - The path to the configuration file.
 * @returns The parsed configuration object.
 */
export async function readConfig(configPath?: string): Promise<Config> {
  const defaultConfigFileName = 'copyrc.json';
  const possibleConfigFiles = ['copyrc.json', '.copyrc.json'];
  let resolvedPath = configPath ? path.resolve(configPath) : null;

  // If no config path specified, try possible config files
  if (!resolvedPath) {
    for (const file of possibleConfigFiles) {
      const testPath = path.resolve(file);
      if (existsSync(testPath)) {
        resolvedPath = testPath;
        break;
      }
    }
  }

  // If still no config found, ask to create one
  if (!resolvedPath || !existsSync(resolvedPath)) {
    Printer.error('Config file not found');
    Printer.error(
      `Please create a ${defaultConfigFileName} or specify a config file with --config <path>`
    );
    const response = await askQuestion(
      `Generate a default ${defaultConfigFileName} and proceed? (y/n)`
    );
    if (response === 'y') {
      writeFileSync(defaultConfigFileName, JSON.stringify(DEFAULT_CONFIG));
      resolvedPath = path.resolve(defaultConfigFileName);
    } else {
      process.exit(1);
    }
  }

  try {
    const configData = fs.readFileSync(resolvedPath, 'utf-8');
    return JSON.parse(configData);
  } catch (error: unknown) {
    Printer.error(`Error reading config file: ${resolvedPath}`, error);
    process.exit(1);
  }
}
