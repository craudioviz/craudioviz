const fs = require("fs");
const path = require("path");
import React from "react";

const pluginName = "AIAssistant";
const pluginDir = path.join("src", "plugins", pluginName);
const pluginFile = path.join(pluginDir, `${pluginName}.tsx`);
const indexFile = path.join("src", "plugins", "index.ts");

function log(msg) {
    console.log(`🟢 ${msg}`);
}

// Step 1: Scaffold plugin folder
if (!fs.existsSync(pluginDir)) {
    fs.mkdirSync(pluginDir, { recursive: true });
    log(`📁 Created plugin folder: ${pluginDir}`);
}

// Step 2: Write boilerplate plugin file
const pluginCode = `

const ${pluginName} = () => {
    return (
        <div>
            <h2>AI Assistant Plugin</h2>
            <p>This plugin provides contextual AI support.</p>
        </div>
    );
};

export default ${pluginName};
`;

fs.writeFileSync(pluginFile, pluginCode.trim());
log(`📝 Plugin code written: ${pluginFile}`);

// Step 3: Inject into plugin index
const exportLine = `export { default as ${pluginName} } from "./${pluginName}/${pluginName}";\n`;
fs.appendFileSync(indexFile, exportLine);
log(`🔗 Registered ${pluginName} in plugin index.`);

log("✅ AI Assistant Plugin injected.");