
import os, zipfile
try:
    from pydrive.auth import GoogleAuth
    from pydrive.drive import GoogleDrive
except ImportError:
    import subprocess
    subprocess.call(['pip', 'install', 'PyDrive'])
    from pydrive.auth import GoogleAuth
    from pydrive.drive import GoogleDrive

workspace = '../CRAudioViz'
zip_path = 'workspace_backup.zip'

with zipfile.ZipFile(zip_path, 'w') as zipf:
    for root, _, files in os.walk(workspace):
        for file in files:
            zipf.write(os.path.join(root, file))

gauth = GoogleAuth()
gauth.LocalWebserverAuth()
drive = GoogleDrive(gauth)

file_drive = drive.CreateFile({'title': zip_path})
file_drive.SetContentFile(zip_path)
file_drive.Upload()

print('✅ Backup uploaded to Google Drive.')
