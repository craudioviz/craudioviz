import { ProjectForm } from "../components/projects/ProjectForm";
import { ProjectViewer } from "../components/projects/ProjectViewer";

export const ProjectsPage = () => {
    return (
        <div>
            <h1>Projects</h1>
            <ProjectForm />
            <ProjectViewer />
        </div>
    );
};