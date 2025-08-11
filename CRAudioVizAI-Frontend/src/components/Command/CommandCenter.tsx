import React, { useState } from "react";
import ProjectDashboard from "../projects/ProjectDashboard";
import { LogViewer } from "../logs/LogViewer";
import { RestoreFlowTrigger } from "../flows/RestoreFlowTrigger";
import { RestoreSummary } from "../flows/RestoreSummary";
import { DiagnosticsConsole } from "../diagnostics/DiagnosticsConsole";

type LogEntry = {
  timestamp: string;
  message: string;
  level?: "info" | "warn" | "error";
};

type RestoreResult = {
  timestamp: string;
  projectId: string;
  environment: string;
  success: boolean;
  errors?: string[];
  durationMs?: number;
};

const CommandCenter: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [restoreResults, setRestoreResults] = useState<RestoreResult[]>([]);

  const handleLog = (msg: string, level: "info" | "warn" | "error" = "info") => {
    const entry = {
      timestamp: new Date().toLocaleTimeString(),
      message: msg,
      level,
    };
    setLogs((prev) => [entry, ...prev]);
    console.log(`🧾 ${msg}`);
  };

  const logRestoreResult = (result: RestoreResult) => {
    setRestoreResults((prev) => [result, ...prev]);
    handleLog(
      `📦 Restore ${result.success ? "succeeded" : "failed"} for ${result.projectId}`,
      result.success ? "info" : "error"
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧠 Command Center</h1>
      <p>Control panel for all operational flows, logs, and onboarding.</p>

      <section style={{ marginTop: "2rem" }}>
        <ProjectDashboard onLog={handleLog} />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <RestoreFlowTrigger onLog={handleLog} />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <RestoreSummary results={restoreResults} />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <DiagnosticsConsole onLog={handleLog} />
      </section>

      <section style={{ marginTop: "2rem" }}>
        <LogViewer logs={logs} />
      </section>
    </div>
  );
};

export default CommandCenter;
