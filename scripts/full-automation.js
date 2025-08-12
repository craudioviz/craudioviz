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

// 🧹 Cleanup
if (fs.existsSync(".git")) {
    log("🧹 Removing corrupted .git folder...");
    fs.rmSync(".git", { recursive: true, force: true });
}

// 📝 Write .gitignore
const gitignorePath = path.join(process.cwd(), ".gitignore");
if (!fs.existsSync(gitignorePath)) {
    log("📝 Writing .gitignore...");
    fs.writeFileSync(gitignorePath, "node_modules/\ndist/\n.env\n");
}

// 📝 Write .gitattributes
log("📝 Writing .gitattributes...");
fs.writeFileSync(".gitattributes", "* text=auto\n");

// 🔐 Git Config
log("🔐 Setting Git config...");
run("git init");
run(`git config user.name "${gitUserName}"`);
run(`git config user.email "${gitUserEmail}"`);

// 🧩 Scaffold Plugins
log("🧩 Scaffolding CopilotChat Plugin...");
run("node scripts/inject-copilot-chat.js");

log("🔐 Injecting Supabase Auth...");
run("node scripts/inject-supabase-auth.js");

log("🧠 Injecting AI Assistant Plugin...");
run("node scripts/inject-ai-assistant.js"); // ← Create this if needed

// 📤 GitHub Push
log("🚀 Creating GitHub repo...");
const repoList = run(`gh repo list ${githubUser} --limit 100`, true);
const repoExists = repoList.includes(repoName);

if (!repoExists) {
    run(`gh repo create ${repoName} --public --source=. --remote=origin --push`);
} else {
    run(`git add .`);
    run(`git commit -m "Automated commit from full suite"`);
    run(`git remote add origin https://github.com/${githubUser}/${repoName}.git`);
    run(`git push -u origin master`);
}

// 📁 Google Drive Backup
log("📁 Running Google Drive backup...");
run("python scripts/backup-to-drive.py");

log("✅ Full automation suite complete.");