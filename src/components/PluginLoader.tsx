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