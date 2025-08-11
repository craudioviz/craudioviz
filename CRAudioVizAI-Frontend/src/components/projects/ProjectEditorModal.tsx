import React, { useState, useEffect } from "react";

type Project = {
  id: string;
  name: string;
  status: string;
  createdAt?: string;
};

type ProjectEditorModalProps = {
  project: Project;
  onClose: () => void;
  onRefresh: () => void;
  onLog?: (msg: string, level?: "info" | "warn" | "error") => void;
};

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  project,
  onClose,
  onRefresh,
  onLog,
}) => {
  const [name, setName] = useState(project.name);
  const [status, setStatus] = useState(project.status);

  useEffect(() => {
    onLog?.(`🛠️ Editing project: ${project.name}`, "info");
  }, [project, onLog]);

  const handleSave = () => {
    const updated = { ...project, name, status };
    // TODO: Persist update to backend or state
    onLog?.(`✅ Saved changes to ${name} [${status}]`, "info");
    onRefresh();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        padding: "2rem",
        border: "1px solid #ccc",
        zIndex: 1000,
        width: "400px",
      }}
    >
      <h3>✏️ Edit Project</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Ready">Ready</option>
          <option value="Archived">Archived</option>
        </select>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleSave}>💾 Save</button>
          <button
            onClick={() => {
              onLog?.(`❌ Cancelled editing ${project.name}`, "warn");
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
