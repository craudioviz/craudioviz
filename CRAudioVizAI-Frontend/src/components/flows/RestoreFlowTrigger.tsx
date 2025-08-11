import React, { useState } from "react";

type RestoreParams = {
  projectId: string;
  environment: "dev" | "prod";
  dryRun: boolean;
};

type RestoreResult = {
  timestamp: string;
  projectId: string;
  environment: string;
  success: boolean;
  errors?: string[];
  durationMs?: number;
};

type RestoreFlowTriggerProps = {
  onLog: (msg: string, level?: "info" | "warn" | "error") => void;
  onResult?: (result: RestoreResult) => void;
};

export const RestoreFlowTrigger: React.FC<RestoreFlowTriggerProps> = ({
  onLog,
  onResult,
}) => {
  const [params, setParams] = useState<RestoreParams>({
    projectId: "",
    environment: "dev",
    dryRun: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTrigger = () => {
    if (!params.projectId) {
      onLog("Restore aborted: missing project ID", "error");
      return;
    }

    const start = Date.now();
    onLog(`🔧 Restore triggered for ${params.projectId} [${params.environment}]`, "info");
    onLog(`Dry run: ${params.dryRun ? "enabled" : "disabled"}`, "info");

    // Simulate restore flow
    setTimeout(() => {
      const success = Math.random() > 0.2;
      const errors = success ? [] : ["Missing backup file", "Invalid config"];
      const durationMs = Date.now() - start;

      const result: RestoreResult = {
        timestamp: new Date().toLocaleTimeString(),
        projectId: params.projectId,
        environment: params.environment,
        success,
        errors,
        durationMs,
      };

      onResult?.(result);
      onLog(
        `Restore ${success ? "completed" : "failed"} for ${params.projectId} in ${durationMs}ms`,
        success ? "info" : "error"
      );
    }, 1000);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🔄 Restore Flow Trigger</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          name="projectId"
          placeholder="Project ID"
          value={params.projectId}
          onChange={handleChange}
        />
        <select name="environment" value={params.environment} onChange={handleChange}>
          <option value="dev">Dev</option>
          <option value="prod">Prod</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="dryRun"
            checked={params.dryRun}
            onChange={handleChange}
          />
          Dry Run
        </label>
        <button onClick={handleTrigger}>🚀 Trigger Restore</button>
      </div>
    </div>
  );
};
