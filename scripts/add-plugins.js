const readline = require("readline");
const fs = require("fs");
const path = require("path");
import React from "react";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function log(msg) {
    console.log(`🟢 ${msg}`);
}

function prompt(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
    const pluginNameRaw = await prompt("🔧 Enter plugin name (e.g. SmartSearch): ");
    const pluginDesc = await prompt("🧠 Describe what this plugin does: ");

    const pluginName = pluginNameRaw.replace(/\s+/g, "");
    const pluginDir = path.join("src", "plugins", pluginName);
    const pluginFile = path.join(pluginDir, `${pluginName}.tsx`);
    const indexFile = path.join("src", "plugins", "index.ts");

    // Step 1: Scaffold folder
    if (!fs.existsSync(pluginDir)) {
        fs.mkdirSync(pluginDir, { recursive: true });
        log(`📁 Created plugin folder: ${pluginDir}`);
    }

    // Step 2: Write plugin file
    const pluginCode = `

const ${pluginName} = () => {
    return (
        <div>
            <h2>${pluginName} Plugin</h2>
            <p>${pluginDesc}</p>
        </div>
    );
};

export default ${pluginName};
`;

    fs.writeFileSync(pluginFile, pluginCode.trim());
    log(`📝 Plugin code written: ${pluginFile}`);

    // Step 3: Register in index.ts
    const exportLine = `export { default as ${pluginName} } from "./${pluginName}/${pluginName}";\n`;
    fs.appendFileSync(indexFile, exportLine);
    log(`🔗 Registered ${pluginName} in plugin index.`);

    log("✅ Plugin generated and injected.");
    rl.close();
})();