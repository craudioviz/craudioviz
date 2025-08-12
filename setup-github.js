const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const repoName = "CRAudioVizAI";
const githubUser = "royhenderson";
const gitUserName = "Roy Henderson";
const gitUserEmail = "your-email@example.com"; // ← Update if needed

function log(msg) {
  console.log(`🟢 ${msg}`);
}

function run(cmd, silent = false) {
  try {
    return execSync(cmd, { stdio: silent ? "pipe" : "inherit" }).toString().trim();
  } catch (err) {
    console.error(`❌ Command failed: ${cmd}`);
    process.exit(1);
  }
}

// Step 0: Check GitHub CLI Auth
log("Checking GitHub CLI authentication...");
const authStatus = run("gh auth status", true);
if (!authStatus.includes("Logged in to github.com")) {
  console.error("❌ GitHub CLI not authenticated. Run: gh auth login");
  process.exit(1);
}

// Step 1: Clean broken .git folder
if (fs.existsSync(".git")) {
  log("Removing corrupted .git folder...");
  fs.rmSync(".git", { recursive: true, force: true });
}

// Step 2: Initialize Git
log("Initializing Git...");
run("git init");

// Step 3: Set Git config
log("Setting Git user config...");
run(`git config user.name "${gitUserName}"`);
run(`git config user.email "${gitUserEmail}"`);

// Step 4: Write .gitignore if missing
const gitignorePath = path.join(process.cwd(), ".gitignore");
if (!fs.existsSync(gitignorePath)) {
  log("Writing .gitignore...");
  fs.writeFileSync(gitignorePath, "node_modules/\ndist/\n.env\n");
}

// Step 5: Write .gitattributes
log("Writing .gitattributes...");
fs.writeFileSync(".gitattributes", "* text=auto\n");

// Step 6: Stage and commit
log("Staging files...");
run("git add .");
log("Committing...");
run('git commit -m "Initial commit from automation script"');

// Step 7: Check if repo exists
log("Checking if GitHub repo exists...");
const repoList = run(`gh repo list ${githubUser} --limit 100`, true);
const repoExists = repoList.includes(repoName);

// Step 8: Create repo if missing
if (!repoExists) {
  log("Creating GitHub repo...");
  run(`gh repo create ${repoName} --public --source=. --remote=origin --push`);
} else {
  log("Repo already exists. Setting remote origin...");
  run(`git remote add origin https://github.com/${githubUser}/${repoName}.git`);
  log("Pushing to GitHub...");
  run("git push -u origin master");
}

log("✅ GitHub setup complete.");