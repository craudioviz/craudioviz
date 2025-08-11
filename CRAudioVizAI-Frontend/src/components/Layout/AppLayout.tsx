import { Outlet, Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { supabase } from "../../lib/supabaseClient";

export const AppLayout = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <h2 style={styles.logo}>CR AudioViz AI</h2>
                <nav>
                    <Link to="/" style={styles.link}>Dashboard</Link>
                    <Link to="/projects" style={styles.link}>Projects</Link>
                    {/* Add more links here */}
                </nav>
                <button onClick={handleLogout} style={styles.logout}>Logout</button>
            </aside>

            <div style={styles.content}>
                <header style={styles.header}>
                    <span>Welcome, {user?.email}</span>
                </header>
                <main style={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
        fontFamily: "sans-serif",
    },
    sidebar: {
        width: "220px",
        backgroundColor: "#222",
        color: "#fff",
        padding: "1rem",
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "space-between",
    },
    logo: {
        marginBottom: "2rem",
    },
    link: {
        display: "block",
        color: "#fff",
        textDecoration: "none",
        marginBottom: "1rem",
    },
    logout: {
        marginTop: "auto",
        backgroundColor: "#444",
        color: "#fff",
        border: "none",
        padding: "0.5rem",
        cursor: "pointer",
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column" as const,
    },
    header: {
        backgroundColor: "#f0f0f0",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
    },
    main: {
        flex: 1,
        padding: "2rem",
        backgroundColor: "#f9f9f9",
    },
};