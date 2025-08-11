import { Link } from "react-router-dom";

export const DashboardPage = () => {
    return (
        <div style={styles.container}>
            <h1>Dashboard</h1>
            <p>Welcome to CR AudioViz AI. Choose a module to begin:</p>
            <ul style={styles.list}>
                <li>
                    <Link to="/projects" style={styles.link}>
                        Projects
                    </Link>
                </li>
                {/* Add more modules here */}
            </ul>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: "2rem",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    list: {
        listStyle: "none",
        padding: 0,
        marginTop: "1rem",
    },
    link: {
        textDecoration: "none",
        color: "#0077cc",
        fontWeight: "bold",
    },
};