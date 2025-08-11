const readline = require('readline');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pluginRoot = path.join(__dirname, 'src/plugins');
const indexFile = path.join(pluginRoot, 'index.ts');

const menu = `
🧭 CR AudioViz AI Launcher

[1] Run Full Automation Suite
[2] Add New Plugin
[3] Push to GitHub
[4] Run Google Drive Backup
[5] Inject Supabase Auth
[6] Inject CopilotChat Plugin
[7] Plugin Registry + Status Check
[0] Exit
`;

console.log(menu);
rl.question('Select an option: ', async (answer) => {
  switch (answer.trim()) {
    case '1':
      execSync('node scripts/run-all.js', { stdio: 'inherit' });
      rl.close();
      break;

    case '2':
      rl.question('🔌 Plugin name: ', (name) => {
        const pluginDir = path.join(pluginRoot, name);
        const pluginFile = path.join(pluginDir, `${name}.tsx`);

        if (!fs.existsSync(pluginDir)) fs.mkdirSync(pluginDir);
        fs.writeFileSync(pluginFile, `export default function ${name}() {
  return <div>${name} Plugin Loaded</div>;
}
`);
        fs.appendFileSync(indexFile, `export { default as ${name} } from './${name}/${name}';\n`);
        console.log(`✅ Plugin ${name} created.`);
        rl.close();
      });
      break;

    case '3':
      try {
        execSync('git add .');
        execSync('git commit -m "Manual push from CLI"');
        execSync('git push -u origin master');
        console.log('✅ Pushed to GitHub.');
      } catch (err) {
        console.error('❌ GitHub push failed:', err.message);
      }
      rl.close();
      break;

    case '4':
      try {
        execSync('python scripts/backup-to-drive.py', { stdio: 'inherit' });
        console.log('✅ Backup complete.');
      } catch (err) {
        console.error('❌ Backup failed:', err.message);
      }
      rl.close();
      break;

    case '5':
      const authPath = path.join(__dirname, 'src/components/Auth.tsx');
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
      rl.close();
      break;

    case '6':
      const copilotDir = path.join(pluginRoot, 'CopilotChat');
      const copilotFile = path.join(copilotDir, 'CopilotChat.tsx');
      if (!fs.existsSync(copilotDir)) fs.mkdirSync(copilotDir);
      fs.writeFileSync(copilotFile, `
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
      console.log('✅ CopilotChat plugin injected.');
      rl.close();
      break;

    case '7':
      console.log('\n📦 Plugin Registry:\n');
      const pluginFolders = fs.readdirSync(pluginRoot).filter(f => fs.statSync(path.join(pluginRoot, f)).isDirectory());
      const indexContent = fs.readFileSync(indexFile, 'utf-8');

      pluginFolders.forEach(folder => {
        const pluginPath = path.join(pluginRoot, folder, `${folder}.tsx`);
        const exists = fs.existsSync(pluginPath);
        const registered = indexContent.includes(folder);
        const status = exists && registered ? '✅ Injected' : exists ? '⚠️ Missing index entry' : '❌ Missing file';
        console.log(`🔌 ${folder}: ${status}`);
      });

      rl.close();
      break;

    case '0':
      console.log('👋 Exiting.');
      rl.close();
      break;

    default:
      console.log('❌ Invalid option.');
      rl.close();
  }
});