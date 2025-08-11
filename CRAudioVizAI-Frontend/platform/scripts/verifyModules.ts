import fs from "fs";
import path from "path";

interface ModuleEntry {
    id: string;
    name: string;
    path: string;
    entry: string;
    enabled: boolean;
}

interface Schema {
    platform: string;
    version: string;
    modules: ModuleEntry[];
    settings: {
        logLevel: string;
        outputPath: string;
        strictValidation: boolean;
    };
}

const configPath = process.argv[2] || "platform/config/ModuleSchema.json";

function log(message: string) {
    console.log(message);
}

function loadSchema(filePath: string): Schema {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
}

async function runModule(mod: ModuleEntry) {
    const fullPath = path.resolve(mod.path);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`❌ Module file not found: ${mod.path}`);
    }

    const imported = await import(fullPath);
    const [objectName, methodName] = mod.entry.split(".");
    const target = imported[objectName];

    if (!target || typeof target[methodName] !== "function") {
        throw new Error(`❌ Entry point not found: ${mod.entry}`);
    }

    log(`🔧 Running ${mod.name} (${mod.id})...`);
    const result = await target[methodName]();
    log(`✅ Result: ${JSON.stringify(result)}\n`);
    return result;
}

async function main() {
    log(`\n📄 Loading schema from: ${configPath}`);
    const schema = loadSchema(configPath);

    log(`🧠 Platform: ${schema.platform} | Version: ${schema.version}`);
    log(`🔍 Modules to validate: ${schema.modules.length}\n`);

    const summary: Record<string, any> = {};

    for (const mod of schema.modules) {
        if (!mod.enabled) {
            log(`⚠️ Skipping disabled module: ${mod.id}`);
            continue;
        }

        try {
            const result = await runModule(mod);
            summary[mod.id] = { status: "ok", result };
        } catch (err: any) {
            log(err.message);
            summary[mod.id] = { status: "error", message: err.message };
        }
    }

    log(`\n📊 Summary:\n${JSON.stringify(summary, null, 2)}\n`);
}

main();