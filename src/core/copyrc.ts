import { Config } from "../types/config.js";
import { copyTemplateFile } from "./helper.js";
import { printInfo, printError, printSuccess } from "./logger.js";

/**
 * Copy all files from the source to the destination as specified in the config.
 *
 * @param config - Configuration object
 * @param verbose - Verbose mode enabled
 */
export function copyrc(config: Config, verbose: boolean) {
  if (verbose) {
    printInfo("Running copyrc with verbose mode enabled...");
  }

  let allSuccess = true;

  for (const file of config.files) {
    const result = copyTemplateFile(file.source, file.destination);
    if (!result) {
      allSuccess = false;
    }
  }

  if (allSuccess) {
    printSuccess("All required files are copied or already exist.");
  } else {
    printError("Some files failed to copy.");
  }
}
