import React from "react";
import { ModuleStatus } from "./ModuleStatus";

export const CockpitDashboard: React.FC = () => {
    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h2>🧭 CR AudioViz Cockpit</h2>
            <p>Monitor restore flows, module health, and logs in one place.</p>


            <section style={{ marginTop: "2rem" }}>
                <ModuleStatus />
            </section>
        </div>
    );
};
