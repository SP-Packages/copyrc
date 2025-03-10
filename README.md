# **CopyRC**

_A lightweight CLI tool to automate copying template files during project setup or runtime._

## **✨ Features**

- 📂 Copies template files to designated locations
- 🔄 Skips existing files to prevent overwrites
- ⚡ Works with **any project type** (WordPress, Node.js, PHP, etc.)
- 🔧 Fully configurable via `copyrc.config.json`
- 🛠️ Can be integrated into CI/CD, Lando, and other automation workflows

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

## **🚀 Usage**

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
