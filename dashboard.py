import tkinter as tk
from tkinter import messagebox
import subprocess
import os

def launch_cli():
    cli_path = os.path.join(os.getcwd(), "cli-launcher.js")
    if os.path.exists(cli_path):
        subprocess.run(["node", cli_path], shell=True)
    else:
        messagebox.showerror("Error", "cli-launcher.js not found.")

root = tk.Tk()
root.title("CRAUDIOVIZ Dashboard")
root.geometry("400x200")
root.configure(bg="#1e1e1e")

label = tk.Label(root, text="Welcome to CRAUDIOVIZ", font=("Segoe UI", 16), fg="white", bg="#1e1e1e")
label.pack(pady=30)

launch_button = tk.Button(root, text="Launch CLI", font=("Segoe UI", 12), command=launch_cli, bg="#0078D7", fg="white")
launch_button.pack(pady=10)

root.mainloop()