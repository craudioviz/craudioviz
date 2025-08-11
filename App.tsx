import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VoiceEnhancer from "./plugins/mock/VoiceEnhancer";

function App() {
  return (
    <Router>
      <div style={{ padding: "2rem", backgroundColor: "#000", color: "#0f0" }}>
        <h1>Hello CR AudioViz AI 👋</h1>
        <Routes>
          <Route path="/plugin/voice-enhancer" element={<VoiceEnhancer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;