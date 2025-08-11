// platform/cockpit/CockpitSidebar.tsx

import React, { useState } from "react";

export const CockpitSidebar: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);

  const triggerAction = async (endpoint: string, label: string) => {
    setStatus(`⏳ ${label} in progress...`);
    try {
      const res = await fetch(`/api/${endpoint}`, { method: "POST" });
      const json = await res.json();
      setStatus(`✅ ${label} complete: ${json.message || "Success"}`);
    } catch (err) {
      setStatus(`❌ ${label} failed: ${err.message}`);
    }
  };

  return (
    <aside style={{
      width: "220px",
      background: "#f0f0f0",
      padding: "1rem",
      borderRight: "1px solid #ccc",
      height: "100%",
      boxSizing: "border-box"
    }}>
      <h4>🧩 Controls</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><button onClick={() => triggerAction("restore", "Restore")}>🔁 Trigger Restore</button></li>
        <li><button onClick={() => triggerAction("diagnostics", "Diagnostics")}>🧪 Run Diagnostics</button></li>
        <li><button onClick={() => triggerAction("backup", "Backup")}>📦 Backup Now</button></li>
        <li><button onClick={() => triggerAction("onboarding", "Onboarding Docs")}>📘 View Onboarding</button></li>
        <li><button onClick={() => triggerAction("branding", "Branding Tools")}>🎨 Branding Tools</button></li>
      </ul>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </aside>
  );
};
