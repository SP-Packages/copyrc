import { Config } from '../types/config.js';
import { copyTemplateFile } from '../utils/helper.js';
import { Printer } from '../utils/logger.js';

/**
 * Copy all files from the source to the destination as specified in the config.
 *
 * @param config - Configuration object
 */
export function copyrc(config: Config) {
  let allSuccess = true;

  for (const file of config.files) {
    const result = copyTemplateFile(file.source, file.destination);
    if (!result) {
      allSuccess = false;
    }
  }

  if (allSuccess) {
    Printer.success('All required files are copied or already exist.');
  } else {
    Printer.error('Some files failed to copy.');
  }
}
