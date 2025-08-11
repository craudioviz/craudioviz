// platform/modules/exampleModule.ts

export const exampleModule = {
    id: "example",
    name: "Example Module",
    description: "A starter module for testing validation.",
    version: "1.0.0",
    run: () => {
        const timestamp = new Date().toISOString();
        console.log(`🟢 exampleModule executed at ${timestamp}`);
        return {
            status: "ok",
            executed: true,
            timestamp
        };
    }
};

