import os
import subprocess

PLUGIN_DIR = "plugins"

def list_plugins():
    return [f for f in os.listdir(PLUGIN_DIR) if f.endswith(".py")]

def run_plugin(name):
    subprocess.run(["python", os.path.join(PLUGIN_DIR, name)])

def scaffold_plugin(name):
    path = os.path.join(PLUGIN_DIR, f"{name}.py")
    if os.path.exists(path):
        print("âŒ Plugin already exists.")
        return
    with open(path, "w") as f:
        f.write(f"""def main():
    print("ðŸ”§ Running {name} plugin...")

if __name__ == "__main__":
    main()
""")
    print(f"âœ… Plugin scaffolded: {path}")

if __name__ == "__main__":
    print("Available plugins:")
    for i, p in enumerate(list_plugins(), 1):
        print(f"[{i}] {p}")
    choice = input("Enter plugin number or name: ")
    if choice.isdigit():
        plugins = list_plugins()
        idx = int(choice) - 1
        if 0 <= idx < len(plugins):
            run_plugin(plugins[idx])
    else:
        scaffold_plugin(choice)
