import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { copyrc } from "../../src/core/copyrc.js";
import { copyTemplateFile } from "../../src/utils/helper.js";
import { Printer } from "../../src/utils/logger.js";
import { Config } from "../../src/types/config.js";

vi.mock("../../src/utils/helper.js", () => ({
  copyTemplateFile: vi.fn(),
}));
vi.mock("../../src/utils/logger.js", () => ({
  Printer: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("copyrc", () => {
  const config: Config = {
    files: [
      { source: "source1.txt", destination: "dest1.txt" },
      { source: "source2.txt", destination: "dest2.txt" },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should print info message if verbose is enabled", () => {
    copyrc(config, true);
    expect(Printer.info).toHaveBeenCalledWith("Running copyrc with verbose mode enabled...");
  });

  it("should copy all files specified in the config", () => {
    (copyTemplateFile as Mock).mockReturnValue(true);
    copyrc(config, false);
    expect(copyTemplateFile).toHaveBeenCalledTimes(config.files.length);
  });

  it("should print success message if all files are copied successfully", () => {
    (copyTemplateFile as Mock).mockReturnValue(true);
    copyrc(config, false);
    expect(Printer.success).toHaveBeenCalledWith("All required files are copied or already exist.");
  });

  it("should print error message if some files failed to copy", () => {
    (copyTemplateFile as Mock).mockReturnValueOnce(true).mockReturnValueOnce(false);
    copyrc(config, false);
    expect(Printer.error).toHaveBeenCalledWith("Some files failed to copy.");
  });
});
