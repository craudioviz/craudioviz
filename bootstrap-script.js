const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 🧠 Utility: Timestamped logging
const log = (msg) => console.log(`[BOOTSTRAP ${new Date().toISOString()}] ${msg}`);

// 🧠 Utility: Safe exec
const safeExec = (cmd, fallback = null) => {
    try {
        return execSync(cmd, { stdio: 'pipe' }).toString().trim();
    } catch {
        log(`❌ Command failed: ${cmd}`);
        return fallback;
    }
};

// ✅ Step 1: Create required folders
const folders = ['config', 'plugins', 'scripts', 'assets', 'logs', 'temp'];
folders.forEach(folder => {
    const fullPath = path.join(__dirname, folder);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
        log(`📁 Created: ${folder}`);
    } else {
        log(`📁 Exists: ${folder}`);
    }
});

// ✅ Step 2: Install required packages
const requiredPackages = ['chalk', 'dotenv', 'fs-extra'];
requiredPackages.forEach(pkg => {
    try {
        require.resolve(pkg);
        log(`📦 Package ready: ${pkg}`);
    } catch {
        log(`📦 Installing: ${pkg}`);
        safeExec(`npm install ${pkg}`);
    }
});

// ✅ Step 3: Load or create config
const configPath = path.join(__dirname, 'config', 'bootstrap.json');
let config = {};
if (!fs.existsSync(configPath)) {
    config = {
        plugins: ['plugin-builder', 'health-checker'],
        env: { MODE: 'dev', LOG_LEVEL: 'verbose' },
        git: { autoPush: true, repoName: 'CRAudioViz' },
        cloud: { sync: true, provider: 'aws', bucket: 'craudioviz-assets' }
    };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    log(`🧾 Created config: bootstrap.json`);
} else {
    config = JSON.parse(fs.readFileSync(configPath));
    log(`🧾 Loaded config: bootstrap.json`);
}

// ✅ Step 4: Scaffold plugins
config.plugins.forEach(plugin => {
    const pluginDir = path.join(__dirname, 'plugins', plugin);
    const pluginFile = path.join(pluginDir, 'index.js');
    if (!fs.existsSync(pluginDir)) {
        fs.mkdirSync(pluginDir);
        fs.writeFileSync(pluginFile, `module.exports = () => console.log("${plugin} loaded.");`);
        log(`🔧 Scaffolded plugin: ${plugin}`);
    } else {
        log(`🔧 Plugin exists: ${plugin}`);
    }
});

// ✅ Step 5: Register plugins
config.plugins.forEach(plugin => {
    const pluginPath = path.join(__dirname, 'plugins', plugin, 'index.js');
    if (fs.existsSync(pluginPath)) {
        log(`🔌 Registering plugin: ${plugin}`);
        require(pluginPath)();
    } else {
        log(`⚠️ Plugin missing: ${plugin}`);
    }
});

// ✅ Step 6: Run health check
const healthCheckPath = path.join(__dirname, 'plugins', 'health-checker', 'index.js');
if (fs.existsSync(healthCheckPath)) {
    log(`🩺 Running health check...`);
    require(healthCheckPath)();
}

// ✅ Step 7: Build plugin assets
config.plugins.forEach(plugin => {
    const assetDir = path.join(__dirname, 'assets', plugin);
    if (!fs.existsSync(assetDir)) {
        fs.mkdirSync(assetDir);
        fs.writeFileSync(path.join(assetDir, 'README.md'), `# Assets for ${plugin}`);
        log(`📦 Built assets for: ${plugin}`);
    }
});

// ✅ Step 8: GitHub automation
if (config.git?.autoPush) {
    log(`🔃 GitHub push for repo: ${config.git.repoName}`);
    safeExec(`git init`);
    safeExec(`git remote add origin https://github.com/your-org/${config.git.repoName}.git`);
    safeExec(`git add .`);
    safeExec(`git commit -m "Automated bootstrap commit"`);
    safeExec(`git push -u origin master`);
}

// ✅ Step 9: Cloud sync (AWS S3)
if (config.cloud?.sync && config.cloud.bucket) {
    log(`☁️ Syncing to AWS S3 bucket: ${config.cloud.bucket}`);
    safeExec(`aws s3 sync ./assets s3://${config.cloud.bucket}`);
}

// ✅ Step 10: Trigger launch script
const launchScript = path.join(__dirname, 'scripts', 'launch.js');
if (fs.existsSync(launchScript)) {
    log(`🚀 Launching: launch.js`);
    require(launchScript);
} else {
    log(`✅ Bootstrap complete. No launch script found.`);
}