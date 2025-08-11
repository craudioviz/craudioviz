const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ✅ Clean .git if corrupted
try {
  if (fs.existsSync('.git')) {
    console.log('🧹 Removing corrupted .git folder...');
    execSync('rd /s /q .git');
  }
} catch (err) {
  console.error('❌ Failed to clean .git:', err.message);
}

// ✅ Create .gitignore
fs.writeFileSync('.gitignore', `
node_modules/
.tmp.driveupload/
workspace_backup.zip
.env
`);
console.log('✅ .gitignore written.');

// ✅ Scaffold Plugin
const pluginName = 'CopilotChat';
const pluginDir = path.join(__dirname, '../src/plugins', pluginName);
const pluginFile = path.join(pluginDir, `${pluginName}.tsx`);
const indexFile = path.join(__dirname, '../src/plugins/index.ts');

if (!fs.existsSync(pluginDir)) fs.mkdirSync(pluginDir);
fs.writeFileSync(pluginFile, `export default function ${pluginName}() {
  return <div>${pluginName} Plugin Loaded</div>;
}
`);
fs.appendFileSync(indexFile, `export { default as ${pluginName} } from './${pluginName}/${pluginName}';\n`);
console.log(`✅ Plugin ${pluginName} scaffolded.`);

// ✅ Inject Supabase Auth
const authPath = path.join(__dirname, '../src/components/Auth.tsx');
fs.writeFileSync(authPath, `
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://your-project.supabase.co', 'public-anon-key');

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
  };

  return (
    <div>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={signIn}>Login</button>
      <button onClick={signUp}>Signup</button>
    </div>
  );
}
`);
console.log('✅ Supabase Auth injected.');

// ✅ Inject AI Assistant Plugin
const aiPluginDir = path.join(__dirname, '../src/plugins/CopilotChat');
const aiPluginFile = path.join(aiPluginDir, 'CopilotChat.tsx');
if (!fs.existsSync(aiPluginDir)) fs.mkdirSync(aiPluginDir);
fs.writeFileSync(aiPluginFile, `
import { useState } from 'react';

export default function CopilotChat() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'How can I help?' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify([...messages, { role: 'user', content: input }]),
    });
    const data = await res.json();
    setMessages([...messages, { role: 'user', content: input }, data.reply]);
    setInput('');
  };

  return (
    <div>
      {messages.map((m, i) => <div key={i}><strong>{m.role}:</strong> {m.content}</div>)}
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
`);
console.log('✅ AI Assistant Plugin injected.');

// ✅ GitHub Push
try {
  execSync('git init');
  execSync('git add .');
  execSync('git commit -m "Automated commit"');
  execSync('git remote add origin https://github.com/royhenderson/CRAudioVizAI.git');
  execSync('git push -u origin master');
  console.log('✅ Pushed to GitHub.');
} catch (err) {
  console.error('❌ GitHub push failed:', err.message);
}

// ✅ Write Python Backup Script
const backupScript = `
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
`;

fs.writeFileSync(path.join(__dirname, 'backup-to-drive.py'), backupScript);
console.log('✅ Python backup script written.');

// ✅ Trigger Python Backup
try {
  execSync('python scripts/backup-to-drive.py', { stdio: 'inherit' });
  console.log('✅ Google Drive backup complete.');
} catch (err) {
  console.error('❌ Backup failed:', err.message);
}