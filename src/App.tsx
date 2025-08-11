import React from 'react';
import PluginLoader from './components/PluginLoader';

const App = () => (
  <div className="min-h-screen bg-gray-900 text-white p-4">
    <h1 className="text-3xl font-bold mb-6">CR AudioViz AI Dashboard</h1>
    <PluginLoader />
  </div>
);

export default App;