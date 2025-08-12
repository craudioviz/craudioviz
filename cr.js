const readline = require("readline");
const { execSync } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n🧭 CR AudioViz AI Launcher\n");
console.log("[1] Run Full Automation Suite");
console.log("[2] Add New Plugin");
console.log("[3] Push to GitHub");
console.log("[4] Run Google Drive Backup");
console.log("[5] Inject Supabase Auth");
console.log("[6] Inject CopilotChat Plugin");
console.log("[7] Plugin Registry + Status Check");
console.log("[8] GitHub Setup & Push");
console.log("[9] Plugin Registry + Health Check");
console.log("[10] Add New Plugin (AI-generated)");
console.log("[11] Preview Plugin");
console.log("[12] Test Plugin Code");
console.log("[0] Exit\n");

rl.question("Select an option: ", (answer) => {
  switch (answer.trim()) {
    case "1":
      console.log("🚀 Running Full Automation Suite...");
      execSync("node scripts/full-automation.js", { stdio: "inherit" });
      break;
    case "2":
      console.log("🔌 Adding New Plugin...");
      execSync("node scripts/add-plugin.js", { stdio: "inherit" });
      break;
    case "3":
      console.log("📤 Pushing to GitHub...");
      execSync("git add . && git commit -m \"Auto commit\" && git push", { stdio: "inherit" });
      break;
    case "4":
      console.log("📁 Running Google Drive Backup...");
      execSync("python scripts/backup-to-drive.py", { stdio: "inherit" });
      break;
    case "5":
      console.log("🔐 Injecting Supabase Auth...");
      execSync("node scripts/inject-supabase-auth.js", { stdio: "inherit" });
      break;
    case "6":
      console.log("💬 Injecting CopilotChat Plugin...");
      execSync("node scripts/inject-copilot-chat.js", { stdio: "inherit" });
      break;
    case "7":
      console.log("📦 Checking Plugin Registry...");
      execSync("node scripts/plugin-status.js", { stdio: "inherit" });
      break;
    case "8":
      console.log("🚀 Running GitHub Setup...");
      execSync("node setup-github.js", { stdio: "inherit" });
      break;
    case "9":
      console.log("🧪 Checking Plugin Health...");
      execSync("node scripts/plugin-status.js", { stdio: "inherit" });
      break;
    case "10":
      console.log("🧠 Generating new plugin...");
      execSync("node scripts/add-plugin.js", { stdio: "inherit" });
      break;
    case "11":
      console.log("🔍 Previewing plugin...");
      execSync("node scripts/plugin-preview.js", { stdio: "inherit" });
      break;
    case "12":
      console.log("🧪 Testing plugin code...");
      execSync("node scripts/plugin-test.js", { stdio: "inherit" });
      break;
    case "0":
      console.log("👋 Exiting...");
      rl.close();
      return;
    default:
      console.log("❌ Invalid option.");
  }

  rl.close();
});