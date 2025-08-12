import os
import json
import datetime
import subprocess
import zipfile
import sys
import tkinter as tk
from tkinter import messagebox, ttk

ROOT = os.getcwd()
PLUGIN_DIR = os.path.join(ROOT, "plugins")
LOG_DIR = os.path.join(ROOT, "logs")
DOCS_DIR = os.path.join(ROOT, "docs")
RELEASE_DIR = os.path.join(ROOT, "releases")
REGISTRY_FILE = os.path.join(ROOT, "registry.json")
DOC_FILE = os.path.join(DOCS_DIR, "plugins.md")
LOG_FILE = os.path.join(LOG_DIR, "registry.log")
ZIP_FILE = os.path.join(RELEASE_DIR, "CRAUDIOVIZ_v1.0.zip")

flags = set(arg for arg in sys.argv[1:] if arg.startswith("--"))
launch_gui = "--launch" in flags
push_git = "--push" in flags

def log(msg):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    os.makedirs(LOG_DIR, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {msg}\n")
    print(msg)

def scan_plugins():
    registry = []
    if not os.path.exists(PLUGIN_DIR):
        log(f"⚠️ Plugin directory '{PLUGIN_DIR}' does not exist.")
        return
    for fname in os.listdir(PLUGIN_DIR):
        if fname.endswith(".py"):
            path = os.path.join(PLUGIN_DIR, fname)
            with open(path, "r", encoding="utf-8") as f:
                lines = f.readlines()
            meta = {"name": fname.replace(".py", ""), "desc": "", "tags": "", "version": "0.1.0"}
            for line in lines:
                if "Description:" in line: meta["desc"] = line.split(":", 1)[1].strip()
                if "Tags:" in line: meta["tags"] = line.split(":", 1)[1].strip()
                if "Version:" in line: meta["version"] = line.split(":", 1)[1].strip()
            registry.append(meta)
    with open(REGISTRY_FILE, "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2)
    log(f"📦 Registry built with {len(registry)} plugins.")

def generate_docs():
    os.makedirs(DOCS_DIR, exist_ok=True)
    if not os.path.exists(REGISTRY_FILE):
        log("⚠️ Registry file not found. Skipping docs generation.")
        return
    with open(REGISTRY_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    with open(DOC_FILE, "w", encoding="utf-8") as f:
        f.write("# CRAUDIOVIZ Plugin Documentation\n\n")
        for plugin in data:
            f.write(f"## {plugin['name']}\n")
            f.write(f"- Description: {plugin['desc']}\n")
            f.write(f"- Tags: {plugin['tags']}\n")
            f.write(f"- Version: {plugin['version']}\n\n")
    log("📘 Plugin docs generated.")

def package_release():
    os.makedirs(RELEASE_DIR, exist_ok=True)
    with zipfile.ZipFile(ZIP_FILE, "w") as zipf:
        for folder in [PLUGIN_DIR, DOCS_DIR]:
            if not os.path.exists(folder):
                continue
            for fname in os.listdir(folder):
                fpath = os.path.join(folder, fname)
                zipf.write(fpath, arcname=os.path.join(os.path.basename(folder), fname))
        if os.path.exists(REGISTRY_FILE):
            zipf.write(REGISTRY_FILE, arcname="registry.json")
    log(f"📦 Release packaged: {ZIP_FILE}")

def push_to_git():
    if not os.path.exists(os.path.join(ROOT, ".git")):
        log("🔒 Git repo not found. Skipping push.")
        return
    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", "CRAUDIOVIZ full build"], check=True)
        subprocess.run(["git", "push", "--set-upstream", "origin", "master"], check=True)
        log("✅ Changes pushed to GitHub.")
    except subprocess.CalledProcessError:
        log("❌ Git push failed.")

def launch_gui_cockpit():
    if not os.path.exists(REGISTRY_FILE):
        messagebox.showerror("Error", "Registry file not found.")
        return
    with open(REGISTRY_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    root = tk.Tk()
    root.title("CRAUDIOVIZ Cockpit")
    root.geometry("700x400")

    tree = ttk.Treeview(root, columns=("Description", "Tags", "Version"), show="headings")
    tree.heading("Description", text="Description")
    tree.heading("Tags", text="Tags")
    tree.heading("Version", text="Version")
    tree.column("Description", width=300)
    tree.column("Tags", width=150)
    tree.column("Version", width=80)

    for plugin in data:
        tree.insert("", "end", text=plugin["name"], values=(plugin["desc"], plugin["tags"], plugin["version"]))

    tree.pack(fill="both", expand=True)

    def run_selected():
        selected = tree.selection()
        if not selected:
            messagebox.showinfo("Run Plugin", "No plugin selected.")
            return
        name = tree.item(selected[0])["text"]
        path = os.path.join(PLUGIN_DIR, f"{name}.py")
        subprocess.run(["python", path])

    btn = tk.Button(root, text="Run Selected Plugin", command=run_selected)
    btn.pack(pady=10)

    root.mainloop()

def main():
    log("🚀 Starting full CRAUDIOVIZ build...")
    scan_plugins()
    generate_docs()
    package_release()
    if push_git:
        push_to_git()
    if launch_gui:
        launch_gui_cockpit()
    log("✅ Build complete.")

if __name__ == "__main__":
    main()