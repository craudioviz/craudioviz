import { useUser } from "../hooks/useUser";

export const Dashboard = () => {
  const { user, session } = useUser();

  return (
    <div>
      <h2>Dashboard</h2>

      <section style={styles.card}>
        <h3>User Info</h3>
        {user ? (
          <pre>{JSON.stringify(user, null, 2)}</pre>
        ) : (
          <p>No user data available.</p>
        )}
      </section>

      <section style={styles.card}>
        <h3>Session</h3>
        {session ? (
          <pre>{JSON.stringify(session, null, 2)}</pre>
        ) : (
          <p>No session data available.</p>
        )}
      </section>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    padding: "1rem",
    marginBottom: "1rem",
    borderRadius: "6px",
    boxShadow: "0 0 4px rgba(0,0,0,0.1)",
  },
};