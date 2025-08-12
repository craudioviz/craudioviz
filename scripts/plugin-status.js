const fs = require("fs");
const path = require("path");

const pluginIndexPath = path.join("src", "plugins", "index.ts");
const pluginRoot = path.join("src", "plugins");

const expectedPlugins = ["CopilotChat", "SupabaseAuth", "AIAssistant"];

function log(msg) {
    console.log(`🟢 ${msg}`);
}

function warn(msg) {
    console.warn(`⚠️ ${msg}`);
}

function checkPlugin(name) {
    const folder = path.join(pluginRoot, name);
    const file = path.join(folder, `${name}.tsx`);
    const indexContent = fs.existsSync(pluginIndexPath)
        ? fs.readFileSync(pluginIndexPath, "utf-8")
        : "";

    let healthy = true;

    if (!fs.existsSync(folder)) {
        warn(`Missing folder: ${folder}`);
        healthy = false;
    }

    if (!fs.existsSync(file)) {
        warn(`Missing file: ${file}`);
        healthy = false;
    }

    if (!indexContent.includes(`./${name}/${name}`)) {
        warn(`Not registered in index.ts: ${name}`);
        healthy = false;
    }

    if (healthy) {
        log(`✅ Plugin ${name} is healthy.`);
    }
}

log("🔍 Checking plugin registry...\n");

expectedPlugins.forEach(checkPlugin);

log("\n📦 Plugin status check complete.");