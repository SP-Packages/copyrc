# **CopyRC**

<p align="center"><i>A lightweight CLI tool to automate copying template files during project setup or runtime.</i></p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@sp-packages/copyrc" alt="npm version">
  <a href="https://packagephobia.com/result?p=@sp-packages/copyrc">
    <img src="https://packagephobia.com/badge?p=@sp-packages/copyrc" alt="install size">
  </a>
  <img src="https://img.shields.io/npm/dw/@sp-packages/copyrc" alt="npm downloads">
  <img src="https://img.shields.io/npm/l/@sp-packages/copyrc" alt="license">
  <img src="https://github.com/SP-Packages/copyrc/actions/workflows/release.yml/badge.svg" alt="build status">
  <a href="https://github.com/semantic-release/semantic-release">
    <img src="https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release" alt="semantic-release">
  </a>
  <img src="https://img.shields.io/badge/Made%20with-TypeScript-blue.svg" alt="TypeScript">
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="Prettier">
  <a href="https://codecov.io/gh/SP-Packages/copyrc">
    <img src="https://codecov.io/gh/SP-Packages/copyrc/graph/badge.svg?token=60X95UNTQL" alt="codecov">
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome">
   <a href="https://github.com/sponsors/iamsenthilprabu">
    <img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-pink?logo=github" alt="Sponsor">
  </a>
</p>

## **✨ Features**

- 📂 Copies template files to designated locations
- 🔄 Skips existing files to prevent overwrites
- ⚡ Works with **any project type** (WordPress, Node.js, PHP, etc.)
- 🔧 Fully configurable via `copyrc.config.json`
- 🛠️ Can be integrated into CI/CD, Lando, and other automation workflows
- 📜 Supports **programmatic usage** in Node.js projects

## **📦 Installation**

### **Global Installation** (For system-wide use)

```sh
npm install -g @sp-packages/copyrc
```

This allows you to use `copyrc` globally in your terminal.

### **Local Installation** (For project-specific use)

```sh
npm install @sp-packages/copyrc --save-dev
```

Then, run it via:

```sh
npx copyrc
```

## **⚙️ Configuration (`copyrc.config.json`)**

Create a `copyrc.config.json` in your project root:

```json
{
  "files": [
    { "source": "./templates/.env.template", "destination": "./public/.env" },
    {
      "source": "./templates/wp-config.php.template",
      "destination": "./public/wp-config.php"
    },
    {
      "source": "./templates/.htaccess.template",
      "destination": "./public/.htaccess"
    }
  ]
}
```

If no --config option is provided, copyrc will look for copyrc.config.json in the project root by default.

## **🚀 CLI Usage**

### **Basic Usage**

```sh
copyrc
```

This will use `copyrc.config.json` from the project root.

### **Custom Config File Path**

```sh
copyrc -c ./custom-config.json
```

### **Configuration Options:**

- `files[]` – Array of file mappings
  - `source` – Path to the template file
  - `destination` – Target path where the file should be copied

## **📜 Programmatic Usage (Inside Node.js)**

You can also use `copyrc` inside your JavaScript/TypeScript projects.

### **Import and Run Directly**

```ts
import { copyrc } from "@sp-packages/copyrc";

const config = {
  files: [
    { source: "./templates/.env.template", destination: "./public/.env" },
    {
      source: "./templates/wp-config.php.template",
      destination: "./public/wp-config.php",
    },
  ],
};

copyrc(config, true); // The second argument enables verbose logging
```

### **Example Use Case in a Node.js Script**

Create a script `setup.js`:

```ts
import { copyrc } from "@sp-packages/copyrc";
import fs from "fs";

const configPath = "./copyrc.config.json";

if (fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  copyrc(config, false);
} else {
  console.error("❌ Config file not found!");
}
```

Then run:

```sh
node setup.js
```

## **🎯 Example Outputs**

```sh
⚠ [WARNING] Destination file already exists at ./public/.env. Skipping.
✔ [SUCCESS] wp-config.php.template copied successfully to ./public/wp-config.php
✔ [SUCCESS] All required files are copied or already exist.
```

## **💡 Use Cases**

- **WordPress Setup** – Automate `wp-config.php` and `.htaccess`
- **Environment Files** – Ensure `.env` files are always present
- **Project Bootstrapping** – Copy necessary config files on `composer install`
- **CI/CD Automation** – Automate file setups during deployments

### **1️⃣ Automating Lando Post-Start Hook**

If you're using **Lando**, you can automatically run `copyrc` after `lando start`:

```yaml
services:
  appserver:
    run_as_root:
      - copyrc
```

### **2️⃣ CI/CD Integration**

Run it in GitHub Actions, GitLab CI/CD, or other automation scripts:

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Install Dependencies
        run: npm ci

      - name: Install Copyrc
        run: npm install -g @sp-packages/copyrc

      - name: Run Copyrc
        run: copyrc
```

## **🤝 Contributing**

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## **📜 License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
