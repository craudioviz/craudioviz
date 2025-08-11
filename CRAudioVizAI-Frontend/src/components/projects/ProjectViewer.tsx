// src/components/projects/ProjectViewer.tsx

import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  status: string;
  createdAt?: string;
};

interface ProjectViewerProps {
  projects?: Project[];
  onRestore?: (id: string) => void;
  onLog?: (msg: string) => void;
}

export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  projects,
  onRestore,
  onLog,
}) => {
  const [localProjects, setLocalProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (projects) {
      setLocalProjects(projects);
      onLog?.(`📦 Loaded ${projects.length} external projects`);
    } else {
      onLog?.("⚠️ No external projects passed in");
    }
  }, [projects]);

  const handleRestore = (id: string) => {
    onLog?.(`🔄 Restore triggered for project ${id}`);
    onRestore?.(id);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>📁 Project Viewer</h3>
      {localProjects.length === 0 ? (
        <p>No projects to display.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {localProjects.map((project) => (
            <li
              key={project.id}
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                background: "#f4f4f4",
                borderRadius: "6px",
              }}
            >
              <strong>{project.name}</strong>
              <div>Status: {project.status}</div>
              {project.createdAt && <div>Created: {project.createdAt}</div>}
              <button
                style={{
                  marginTop: "0.5rem",
                  padding: "0.4rem 0.8rem",
                  backgroundColor: "#0077cc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                }}
                onClick={() => handleRestore(project.id)}
              >
                Restore
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
