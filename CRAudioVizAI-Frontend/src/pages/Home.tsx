// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>CR AudioViz AI</h1>
      <p style={styles.subtext}>
        Build, brand, and monetize your own web apps — no code required.
      </p>

      {user ? (
        <Link to="/dashboard" style={styles.button}>
          Go to Dashboard
        </Link>
      ) : (
        <div style={styles.buttonGroup}>
          <Link to="/login" style={styles.button}>
            Log In
          </Link>
          <Link to="/signup" style={styles.buttonSecondary}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subtext: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    textDecoration: "none",
  },
  buttonSecondary: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#eaeaea",
    color: "#333",
    border: "none",
    borderRadius: "4px",
    textDecoration: "none",
  },
};

export default Home;

