import fs from "fs";
import path from "path";
import { printError, printSuccess, printWarning } from "./logger.js";

/**
 * Copy a file from the source to the destination.
 *
 * @param source - Source file path
 * @param destination - Destination file path
 * @returns True if the file was copied successfully, false otherwise
 */
export function copyTemplateFile(source: string, destination: string): boolean {
  if (!fs.existsSync(source)) {
    printError(`Source file not found at ${source}, skipping.`);
    return false;
  }

  const destDir = path.dirname(destination);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(destination)) {
    printWarning(`Destination file already exists at ${destination}. Skipping.`);
    return true;
  }

  try {
    fs.copyFileSync(source, destination);
    printSuccess(`${source} copied successfully to ${destination}`);
    return true;
  } catch (error) {
    printError(`Failed to copy ${source} to ${destination}:`, error as Error);
    return false;
  }
}
