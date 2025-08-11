/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME: string;

  // Optional: Add any additional VITE_ variables here
  // readonly VITE_FEATURE_FLAG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
