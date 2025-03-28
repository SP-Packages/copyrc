#!/usr/bin/env node
import { program } from "commander";
import { createRequire } from "module";
import { copyrc } from "../core/copyrc.js";
import { Printer } from "./../utils/logger.js";
import { readConfig } from "./../core/config.js";

const require = createRequire(import.meta.url);
const { version } = require("../../package.json");

program
  .version(version)
  .description(
    "A lightweight CLI tool to automate copying template files during project setup or runtime.",
  )
  .option("-c, --config <path>", "Specify config file (default: .copyrc.json)")
  .option("-q, --quiet", "Disable output")
  .option("-v, --verbose", "Enable verbose logging")
  .action(async (options) => {
    if (options.verbose) {
      Printer.enableVerbose();
    }
    if (options.quiet) {
      Printer.enableQuiet();
    }

    const config = await readConfig(options.config);
    copyrc(config);
  });

program.parse(process.argv);
