import { useState } from "react";
import ProjectForm from "./ProjectForm";
import { ProjectViewer } from "./ProjectViewer";
import { ProjectEditorModal } from "./ProjectEditorModal";

type Project = {
  id: string;
  name: string;
  status: string;
  createdAt?: string;
};

type ProjectDashboardProps = {
  onLog?: (msg: string, level?: "info" | "warn" | "error") => void;
};

const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ onLog }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-001",
      name: "AudioViz Restore Flow",
      status: "Ready",
      createdAt: "2025-08-01",
    },
    {
      id: "proj-002",
      name: "Supabase Auth Debug",
      status: "Pending",
      createdAt: "2025-08-03",
    },
  ]);

  const [editing, setEditing] = useState<Project | null>(null);

  const handleCreate = (name: string) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProjects((prev) => [...prev, newProject]);
    setEditing(newProject);
    onLog?.(`🆕 Created project: ${name}`, "info");
  };

  const handleUpdate = (updated: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    onLog?.(`✏️ Updated project: ${updated.name}`, "info");
  };

  const handleRestore = (id: string) => {
    onLog?.(`🔧 Restore triggered for project ${id}`, "info");
    // TODO: Inject into restoreFlow.ts
  };

  const handleCloseModal = () => {
    onLog?.(`❌ Closed editor modal`, "info");
    setEditing(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧭 Project Dashboard</h2>
      <ProjectForm
        onCreate={handleCreate}
        existingProjects={projects.map((p) => p.name)}
      />
      <ProjectViewer
        projects={projects}
        onRestore={handleRestore}
        onLog={onLog}
      />
      {editing && (
        <ProjectEditorModal
          project={editing}
          onClose={handleCloseModal}
          onRefresh={() => {}}
        />
      )}
    </div>
  );
};

export default ProjectDashboard;
