const inquirer = require('inquirer');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const log = (msg) => console.log(`[CLI ${new Date().toISOString()}] ${msg}`);

const menu = async () => {
  const choices = [
    'Bootstrap Platform',
    'Run Health Check',
    'Build Plugin',
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
    case 'Exit':
      log('Exiting CLI.');
      process.exit(0);
  }
};

const runBootstrap = () => {
  const scriptPath = path.join(__dirname, 'bootstrap-script.js');
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

menu();