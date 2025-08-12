import os

dashboard_path = "plugin_cli_dashboard.py"

if not os.path.exists(dashboard_path):
    print("❌ Dashboard file not found.")
    exit()

with open(dashboard_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Inject import
if not any("import json" in line for line in lines):
    lines.insert(1, "import json\n")

# Inject view_registry function
if not any("def view_registry()" in line for line in lines):
    registry_func = '''
def view_registry():
    registry_path = "registry.json"
    if not os.path.exists(registry_path):
        print("❌ registry.json not found.")
        return
    with open(registry_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    print("\\n📦 Plugin Registry")
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
'''
    insert_index = next(i for i, line in enumerate(lines) if "def menu()" in line)
    lines.insert(insert_index, registry_func)

# Patch menu option
for i, line in enumerate(lines):
    if 'print("[5] Exit")' in line:
        lines[i] = line + '        print("[6] View plugin registry")\n'

# Patch menu logic
for i, line in enumerate(lines):
    if 'elif choice == "5":' in line:
        lines[i] = line + '        elif choice == "6":\n            view_registry()\n'

# Write patched file
with open(dashboard_path, "w", encoding="utf-8") as f:
    f.writelines(lines)

print("✅ Dashboard patched with registry viewer.")