import os
import datetime
import subprocess
import sys
import subprocess
import datetime

ROOT = os.getcwd()
PLUGIN_DIR = os.path.join(ROOT, "plugins")
LOG_DIR = os.path.join(ROOT, "logs")
LOG_FILE = os.path.join(LOG_DIR, "launch.log")
DASHBOARD_FILE = os.path.join(ROOT, "plugin_cli_dashboard.py")

# Parse CLI flags
args = sys.argv[1:]
flags = {arg for arg in args if arg.startswith("--")}
plugin_meta = {}
for arg in args:
    if "=" in arg and not arg.startswith("--"):
        key, val = arg.split("=", 1)
        plugin_meta[key] = val

silent = "--silent" in flags
launch = "--launch" in flags

def echo(msg):
    if not silent:
        print(msg)

def ensure_dirs():
    os.makedirs(PLUGIN_DIR, exist_ok=True)
    os.makedirs(LOG_DIR, exist_ok=True)
    echo("📁 Folders created or verified.")

def write_dashboard():
    code = '''import os

PLUGIN_DIR = "plugins"
LOG_FILE = "logs/launch.log"

def list_plugins():
    return [f for f in os.listdir(PLUGIN_DIR) if f.endswith(".py")]

def run_plugin(name):
    path = os.path.join(PLUGIN_DIR, name)
    if not os.path.exists(path):
        print(f"❌ Plugin not found: {name}")
        return
    subprocess.run(["python", path])
    log(f"🚀 Ran plugin: {name}")

def scaffold_plugin(name):
    path = os.path.join(PLUGIN_DIR, f"{name}.py")
    if os.path.exists(path):
        print("❌ Plugin already exists.")
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"""def main():
    print("🔧 Running {name} plugin...")

if __name__ == "__main__":
    main()
""")
    log(f"🧪 Scaffolded plugin: {name}.py")
    print(f"✅ Plugin created: {path}")

def view_logs():
    if not os.path.exists(LOG_FILE):
        print("No logs found.")
        return
    with open(LOG_FILE, "r", encoding="utf-8") as f:
        lines = f.readlines()[-10:]
        print("\\n📋 Recent Logs:")
        for line in lines:
            print(line.strip())

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {message}\\n")

def menu():
    while True:
        print("\\n🧠 CRAUDIOVIZ Plugin CLI Dashboard")
        print("[1] List plugins")
        print("[2] Run plugin")
        print("[3] Scaffold new plugin")
        print("[4] View recent logs")
        print("[5] Exit")

        choice = input("Select an option: ").strip()
        if choice == "1":
            plugins = list_plugins()
            print("\\nAvailable plugins:")
            for i, p in enumerate(plugins, 1):
                print(f"[{i}] {p}")
        elif choice == "2":
            name = input("Enter plugin name to run: ").strip()
            run_plugin(name)
        elif choice == "3":
            name = input("Enter new plugin name: ").strip()
            scaffold_plugin(name)
        elif choice == "4":
            view_logs()
        elif choice == "5":
            print("👋 Exiting CLI.")
            break
        else:
            print("❌ Invalid choice.")

if __name__ == "__main__":
    menu()
'''
    with open(DASHBOARD_FILE, "w", encoding="utf-8") as f:
        f.write(code)
    echo(f"✅ Dashboard script written: {DASHBOARD_FILE}")
    log("🧠 CLI dashboard written")

def write_plugin(meta):
    name = meta.get("name")
    if not name:
        echo("⚠️ Plugin name missing.")
        return
    path = os.path.join(PLUGIN_DIR, f"{name}.py")
    if os.path.exists(path):
        echo(f"⚠️ Plugin already exists: {name}")
        return
    desc = meta.get("desc", "")
    tags = meta.get("tags", "")
    version = meta.get("version", "0.1.0")
    with open(path, "w", encoding="utf-8") as f:
        f.write(f'''"""
Plugin: {name}
Description: {desc}
Tags: {tags}
Version: {version}
"""

def main():
    print("🔧 Running plugin: {name}")
    print("📘 Description: {desc}")
    print("🏷️ Tags: {tags}")
    print("🧮 Version: {version}")

if __name__ == "__main__":
    main()
''')
    echo(f"🧪 Plugin created: {name}.py")
    log(f"🧪 Plugin created: {name}.py with metadata")

def init_log():
    if not os.path.exists(LOG_FILE):
        with open(LOG_FILE, "w", encoding="utf-8") as f:
            f.write(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 📝 Log initialized\n")
        echo("📋 Log file initialized.")

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {message}\n")

def auto_git_push():
    if not os.path.exists(os.path.join(ROOT, ".git")):
        echo("🔒 Git repo not found. Skipping push.")
        return
    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", "Auto-build CLI dashboard"], check=True)
        subprocess.run(["git", "push"], check=True)
        echo("✅ Changes pushed to GitHub.")
        log("📤 Auto-pushed to GitHub.")
    except subprocess.CalledProcessError:
        echo("⚠️ Git push failed.")
        log("❌ Git push failed.")

def main():
    echo("🚀 Starting CLI dashboard buildout...")
    ensure_dirs()
    init_log()
    write_dashboard()
    if "name" in plugin_meta:
        write_plugin(plugin_meta)
    auto_git_push()
    if launch:
        echo("🚀 Launching dashboard...")
        subprocess.run(["python", DASHBOARD_FILE])
    else:
        echo("✅ Build complete. Run with: python plugin_cli_dashboard.py")

if __name__ == "__main__":
    main()