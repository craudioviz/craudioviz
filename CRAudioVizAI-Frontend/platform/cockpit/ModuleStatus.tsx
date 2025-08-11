import React, { useEffect, useState } from "react";

type ModuleSummary = {
    [id: string]: {
        status: "ok" | "error";
        result?: any;
        message?: string;
    };
};

export const ModuleStatus: React.FC = () => {
    const [summary, setSummary] = useState<ModuleSummary>({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Replace with your actual API endpoint or data fetching logic
        const fetchSummary = async () => {
            try {
                // Example: fetch from an API endpoint
                const res = await fetch("/api/module-summary");
                if (!res.ok) throw new Error("Failed to fetch module summary");
                const data = await res.json();
                setSummary(data);
            } catch (err) {
                console.error("Failed to load module summary:", err);
            } finally {
                setLoaded(true);
            }
        };
        fetchSummary();
    }, []);

    return (
        <div style={{ marginTop: "2rem" }}>
            <h3>📊 Module Status</h3>
            {!loaded ? (
                <p>Loading summary...</p>
            ) : Object.keys(summary).length === 0 ? (
                <p>No module results found.</p>
            ) : (
                <ul>
                    {Object.entries(summary).map(([id, data]) => (
                        <li key={id}>
                            <strong>{id}</strong>:{" "}
                            {data.status === "ok" ? "✅ OK" : `❌ Error - ${data.message}`}
                            {data.result && (
                                <pre style={{ background: "#f4f4f4", padding: "0.5rem" }}>
                                    {JSON.stringify(data.result, null, 2)}
                                </pre>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};