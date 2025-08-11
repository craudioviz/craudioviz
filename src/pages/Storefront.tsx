import React from "react";
import { Link } from "react-router-dom";
import { getPluginMeta } from "../pluginLoader";

const Storefront: React.FC = () => {
    const plugins = getPluginMeta();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>🛍️ Plugin Storefront</h1>
            <div style={{
                display: "grid",
                gap: "1.5rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
            }}>
                {plugins.map(plugin => (
                    <div key={plugin.id} style={{
                        background: "#1a1a1a",
                        padding: "1.5rem",
                        borderRadius: "8px",
                        boxShadow: "0 0 10px rgba(255, 0, 200, 0.1)"
                    }}>
                        <h2>{plugin.icon} {plugin.name}</h2>
                        <p>{plugin.description}</p>
                        <p><strong>Status:</strong> {plugin.status}</p>
                        <p><strong>Partner:</strong> {plugin.partner}</p>
                        {plugin.status === "active" && plugin.page?.path && (
                            <Link to={plugin.page.path}>
                                <button style={{ marginTop: "1rem" }}>Launch Plugin</button>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Storefront;