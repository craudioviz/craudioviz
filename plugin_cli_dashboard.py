import os
import subprocess
import datetime
import json

PLUGIN_DIR = "plugins"
LOG_FILE = "logs/launch.log"
REGISTRY_FILE = "registry.json"

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
        print("\n📋 Recent Logs:")
        for line in lines:
            print(line.strip())

def view_registry():
    if not os.path.exists(REGISTRY_FILE):
        print("❌ registry.json not found.")
        return
    with open(REGISTRY_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    print("\n📦 Plugin Registry")
    print("+-------------------+-------------------------------+------------------+----------+")
    print("| Name              | Description                   | Tags             | Version  |")
    print("+-------------------+-------------------------------+------------------+----------+")
    for plugin in data:
        name = plugin.get("name", "")
        desc = plugin.get("desc", "")
        tags = plugin.get("tags", "")
        version = plugin.get("version", "")
        print(f"| {name:<18} | {desc:<30} | {tags:<16} | {version:<8} |")
    print("+-------------------+-------------------------------+------------------+----------+")

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {message}\n")

def menu():
    while True:
        print("\n🧠 CRAUDIOVIZ Plugin CLI Dashboard")
        print("[1] List plugins")
        print("[2] Run plugin")
        print("[3] Scaffold new plugin")
        print("[4] View recent logs")
        print("[5] Exit")
        print("[6] View plugin registry")

        choice = input("Select an option: ").strip()
        if choice == "1":
            plugins = list_plugins()
            print("\nAvailable plugins:")
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
        elif choice == "6":
            view_registry()
        else:
            print("❌ Invalid choice.")

if __name__ == "__main__":
    menu()