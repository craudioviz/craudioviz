const inquirer = require('inquirer');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const log = (msg) => console.log(`[CLI ${new Date().toISOString()}] ${msg}`);

const menu = async () => {
    const choices = [
        'Bootstrap Platform',
        'Run Health Check',
        'Build Plugin',
        'Create New Plugin',
        'Exit'
    ];

    const { action } = await inquirer.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an action:',
            choices
        }
    ]);

    switch (action) {
        case 'Bootstrap Platform':
            runBootstrap();
            break;
        case 'Run Health Check':
            runScript('plugins/health-checker/index.js');
            break;
        case 'Build Plugin':
            runScript('scripts/plugin-builder.js');
            break;
        case 'Create New Plugin':
            createPlugin();
            break;
        case 'Exit':
            log('Exiting CLI.');
            process.exit(0);
    }
};

const runBootstrap = () => {
    const scriptPath = path.join(__dirname, 'bootstrap-script.js');
    log(`🔍 Looking for bootstrap at: ${scriptPath}`);
    if (fs.existsSync(scriptPath)) {
        log('🚀 Running bootstrap...');
        try {
            execSync(`node ${scriptPath}`, { stdio: 'inherit' });
            log('✅ Bootstrap complete.');
        } catch {
            log('❌ Bootstrap failed.');
        }
    } else {
        log('❌ bootstrap-script.js not found.');
    }

    const launchScript = path.join(__dirname, 'scripts', 'launch.js');
    if (fs.existsSync(launchScript)) {
        log('🚀 Auto-launching: launch.js');
        try {
            execSync(`node ${launchScript}`, { stdio: 'inherit' });
        } catch {
            log('❌ Launch script failed.');
        }
    }

    menu();
};

const runScript = (relativePath) => {
    const scriptPath = path.join(__dirname, relativePath);
    if (fs.existsSync(scriptPath)) {
        log(`🚀 Running: ${relativePath}`);
        try {
            execSync(`node ${scriptPath}`, { stdio: 'inherit' });
            log(`✅ Completed: ${relativePath}`);
        } catch {
            log(`❌ Failed: ${relativePath}`);
        }
    } else {
        log(`❌ Script not found: ${relativePath}`);
    }
    menu();
};

const createPlugin = async () => {
    const { name } = await inquirer.default.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter plugin name:',
            validate: input => input ? true : 'Plugin name cannot be empty.'
        }
    ]);

    const pluginDir = path.join(__dirname, 'plugins', name);
    const pluginFile = path.join(pluginDir, 'index.js');

    if (fs.existsSync(pluginDir)) {
        log(`⚠️ Plugin already exists: ${name}`);
    } else {
        fs.mkdirSync(pluginDir);
        fs.writeFileSync(pluginFile, `module.exports = () => console.log("${name} loaded.");`);
        log(`🔧 Created plugin: ${name}`);
        require(pluginFile)();
    }

    menu();
};

// ✅ GitHub Credential Check
const checkGitHub = () => {
    const token = process.env.GITHUB_TOKEN;
    if (token) {
        log('🔐 GitHub token detected.');
    } else {
        log('⚠️ No GITHUB_TOKEN found. GitHub push may fail.');
    }
};

// ✅ AWS Credential Check
const checkAWS = () => {
    const awsCreds = path.join(os.homedir(), '.aws', 'credentials');
    if (fs.existsSync(awsCreds)) {
        log('☁️ AWS credentials detected.');
    } else {
        log('⚠️ AWS credentials not found. S3 sync may fail.');
    }
};

// Run checks before menu
checkGitHub();
checkAWS();
menu();