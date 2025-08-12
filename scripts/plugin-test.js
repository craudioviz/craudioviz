const fs = require("fs");
const path = require("path");

const pluginRoot = path.join("src", "plugins");
const indexFile = path.join(pluginRoot, "index.ts");
const indexContent = fs.existsSync(indexFile) ? fs.readFileSync(indexFile, "utf-8") : "";

function log(msg) {
    console.log(`🟢 ${msg}`);
}

function warn(msg) {
    console.warn(`⚠️ ${msg}`);
}

function testPlugin(name) {
    const folder = path.join(pluginRoot, name);
    const file = path.join(folder, `${name}.tsx`);

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

    if (fs.existsSync(file)) {
        const code = fs.readFileSync(file, "utf-8");
        if (!code.includes("const") || !code.includes("return")) {
            warn(`Plugin ${name} may be missing JSX or export.`);
            healthy = false;
        }
    }

    if (healthy) {
        log(`✅ Plugin ${name} passed all tests.`);
    }
}

log("🧪 Running plugin tests...\n");

if (!fs.existsSync(pluginRoot)) {
    warn(`Plugin root folder does not exist: ${pluginRoot}`);
} else {
    const plugins = fs.readdirSync(pluginRoot).filter((f) => fs.lstatSync(path.join(pluginRoot, f)).isDirectory());
    plugins.forEach(testPlugin);
}

log("\n📦 Plugin test complete.");