import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { validateEnvVars } from "./utils/CR-Env_Validator";
import { UserProvider } from "./context/UserContext";

// 🔍 Validate required VITE_ env vars
try {
  validateEnvVars();
} catch (error) {
  console.error("❌ Environment validation failed:", error);
  const root = document.getElementById("root");
  if (root) root.innerHTML = `<pre style="color:red;">${error}</pre>`;
  throw error;
}

// 🚀 Render the app with global user context
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
