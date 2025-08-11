const fs = require('fs');
const path = require('path');

const files = {
  'public/index.html': `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CR AudioViz AI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
  `,

  'src/main.tsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
  `,

  'src/App.tsx': `
import React from 'react';
import PluginLoader from './components/PluginLoader';

const App = () => (
  <div className="min-h-screen bg-gray-900 text-white p-4">
    <h1 className="text-3xl font-bold mb-6">CR AudioViz AI Dashboard</h1>
    <PluginLoader />
  </div>
);

export default App;
  `,

  'src/components/PluginLoader.tsx': `
import React from 'react';
import { plugins } from '../plugins';

const PluginLoader = () => (
  <div className="grid gap-4">
    {plugins.map((Plugin, i) => (
      <div key={i} className="border p-4 rounded bg-gray-800">
        <Plugin />
      </div>
    ))}
  </div>
);

export default PluginLoader;
  `,

  'src/plugins/index.ts': `
import SamplePlugin from './samplePlugin';

export const plugins = [SamplePlugin];
  `,

  'src/plugins/samplePlugin.tsx': `
import React from 'react';

const SamplePlugin = () => (
  <div>
    <h2 className="text-xl font-semibold">Sample Plugin</h2>
    <p>This is a mock plugin for testing modular injection.</p>
  </div>
);

export default SamplePlugin;
  `,

  'src/utils/plugin_api.ts': `
export interface Plugin {
  name: string;
  component: React.FC;
}
  `,

  'src/styles/tailwind.css': `
@tailwind base;
@tailwind components;
@tailwind utilities;
  `,

  'vite.config.ts': `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
  `,

  'tsconfig.json': `
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
  `,

  'postcss.config.js': `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
  `,
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.resolve(filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
  console.log(`✅ Created: ${filePath}`);
});

console.log('\n🎉 CR AudioViz scaffold complete. Run `npm run dev` to launch.');