import fs from "fs";
import path from "path";
import { Config } from "../types/config.js";
import { printInfo, printError } from "./logger.js";

/**
 * Read the configuration file from the given path.
 * If no path is provided, it will look for a copyrc.config.json in the current directory.
 * @param configPath - Path to the configuration file
 * @returns The configuration object
 */
export function readConfig(configPath?: string): Config {
  const defaultConfigFile = "copyrc.config.json";
  const resolvedPath = configPath ? path.resolve(configPath) : path.resolve(defaultConfigFile);

  if (!fs.existsSync(resolvedPath)) {
    printError(`Configuration file not found: ${resolvedPath}`);
    printInfo(
      `Please create a "${defaultConfigFile}" or specify a config file with --config <path>`,
    );
    process.exit(1);
  }

  try {
    const configData = fs.readFileSync(resolvedPath, "utf-8");
    return JSON.parse(configData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      printError(`Error reading config file: ${resolvedPath}`, error);
    } else {
      printError(`Error reading config file: ${resolvedPath}`);
    }
    process.exit(1);
  }
}
