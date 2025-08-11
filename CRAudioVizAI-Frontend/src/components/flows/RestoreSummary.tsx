import React from "react";

type RestoreResult = {
    timestamp: string;
    projectId: string;
    environment: string;
    success: boolean;
    errors?: string[];
    durationMs?: number;
};

type RestoreSummaryProps = {
    results: RestoreResult[];
};

export const RestoreSummary: React.FC<RestoreSummaryProps> = ({ results }) => {
    return (
        <div style={{ marginTop: "2rem" }}>
            <h3>📦 Restore Summary</h3>
            {results.length === 0 ? (
                <p>No restore results yet.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>⏱️ Time</th>
                            <th>📁 Project</th>
                            <th>🌐 Env</th>
                            <th>✅ Status</th>
                            <th>⚠️ Errors</th>
                            <th>⏳ Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((r, idx) => (
                            <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
                                <td>{r.timestamp}</td>
                                <td>{r.projectId}</td>
                                <td>{r.environment}</td>
                                <td style={{ color: r.success ? "green" : "red" }}>
                                    {r.success ? "Success" : "Failed"}
                                </td>
                                <td>
                                    {r.errors && r.errors.length > 0
                                        ? r.errors.join(", ")
                                        : "—"}
                                </td>
                                <td>{r.durationMs ? `${r.durationMs} ms` : "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};