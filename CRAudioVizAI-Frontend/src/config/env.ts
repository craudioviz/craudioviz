type EnvSource = "frontend" | "backend";

interface EnvConfig {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    API_BASE_URL: string;
    APP_NAME: string;
    NODE_ENV?: string;
    LOG_LEVEL?: string;
}

function loadEnv(source: EnvSource): EnvConfig {
    const get = (key: string): string => {
        if (source === "frontend") {
            // @ts-ignore
            const value = import.meta.env[key as keyof ImportMetaEnv] || import.meta.env[key];
            if (!value) throw new Error(`Missing VITE_ env var: ${key}`);
            return value;
        } else {
            const value = process.env[key];
            if (!value) throw new Error(`Missing process.env var: ${key}`);
            return value;
        }
    };

    return {
        SUPABASE_URL: get(source === "frontend" ? "VITE_SUPABASE_URL" : "SUPABASE_URL"),
        SUPABASE_ANON_KEY: get(source === "frontend" ? "VITE_SUPABASE_ANON_KEY" : "SUPABASE_ANON_KEY"),
        API_BASE_URL: get(source === "frontend" ? "VITE_API_BASE_URL" : "API_BASE_URL"),
        APP_NAME: get(source === "frontend" ? "VITE_APP_NAME" : "APP_NAME"),
        NODE_ENV: get(source === "frontend" ? "VITE_NODE_ENV" : "NODE_ENV"),
        LOG_LEVEL: get(source === "frontend" ? "VITE_LOG_LEVEL" : "LOG_LEVEL"),
    };
}

export const env = loadEnv(typeof window === "undefined" ? "backend" : "frontend");