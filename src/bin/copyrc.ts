#!/usr/bin/env node
import { program } from "commander";
import { copyrc } from "../core/copyrc.js";
import { readConfig } from "./../core/config.js";

program
  .version("1.0.0")
  .option("-c, --config <path>", "Specify config file (default: copyrc.config.json)")
  .option("--verbose", "Enable verbose logging")
  .action((options) => {
    const config = readConfig(options.config);
    copyrc(config, options.verbose);
  });

program.parse(process.argv);
