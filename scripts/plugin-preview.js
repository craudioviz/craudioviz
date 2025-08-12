const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function prompt(q) {
    return new Promise((res) => rl.question(q, res));
}

(async () => {
    const pluginNameRaw = await prompt("🔍 Enter plugin name to preview: ");
    const pluginName = pluginNameRaw.replace(/\s+/g, "");
    const pluginFile = path.join("src", "plugins", pluginName, `${pluginName}.tsx`);

    if (!fs.existsSync(pluginFile)) {
        console.error(`❌ Plugin file not found: ${pluginFile}`);
        rl.close();
        return;
    }

    const code = fs.readFileSync(pluginFile, "utf-8");
    console.log(`\n🧩 Preview: ${pluginName}\n`);
    console.log(code);
    rl.close();
})();