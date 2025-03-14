import fs from "fs";
import path from "path";
import { Printer } from "./logger.js";

/**
 * Copy a file from the source to the destination.
 *
 * @param source - Source file path
 * @param destination - Destination file path
 * @returns True if the file was copied successfully, false otherwise
 */
export function copyTemplateFile(source: string, destination: string): boolean {
  if (!fs.existsSync(source)) {
    Printer.error(`Source file not found at ${source}, skipping.`);
    return false;
  }

  const destDir = path.dirname(destination);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(destination)) {
    Printer.warning(`Destination file already exists at ${destination}. Skipping.`);
    return true;
  }

  try {
    fs.copyFileSync(source, destination);
    Printer.success(`${source} copied successfully to ${destination}`);
    return true;
  } catch (error: unknown) {
    Printer.error(`Failed to copy ${source} to ${destination}:`, error);
    return false;
  }
}
