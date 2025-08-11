import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div style={styles.container}>
      <h2>404 - Page Not Found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/" style={styles.link}>Go to Dashboard</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center" as const,
    fontFamily: "sans-serif",
  },
  link: {
    color: "#007bff",
    textDecoration: "underline",
  },
};
