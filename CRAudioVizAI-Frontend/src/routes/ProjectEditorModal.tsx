import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Props = {
    project: { id: number; name: string; status: string };
    onClose: () => void;
    onRefresh: () => void;
};

export const ProjectEditorModal = ({ project, onClose, onRefresh }: Props) => {
    const [name, setName] = useState(project.name);
    const [status, setStatus] = useState(project.status);
    const [message, setMessage] = useState("");

    const handleUpdate = async () => {
        const { error } = await supabase
            .from("projects")
            .update({ name, status })
            .eq("id", project.id);

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage("Updated successfully.");
            onRefresh();
            onClose();
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3>Edit Project</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleUpdate} style={styles.button}>Save</button>
                <button onClick={onClose} style={styles.cancel}>Cancel</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        width: "300px",
    },
    input: {
        width: "100%",
        marginBottom: "1rem",
        padding: "0.5rem",
    },
    button: {
        padding: "0.5rem 1rem",
        marginRight: "1rem",
    },
    cancel: {
        padding: "0.5rem 1rem",
        backgroundColor: "#ccc",
    },
};