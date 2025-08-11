const requiredEnvVars = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY",
  "VITE_API_BASE_URL",
  "VITE_APP_NAME",
];

export function validateEnvVars(): void {
  const missingVars = requiredEnvVars.filter((key) => {
    const value = import.meta.env[key as keyof ImportMetaEnv];
    return !value || value.trim() === "";
  });

  if (missingVars.length > 0) {
    throw new Error(
      `❌ Missing required VITE_ env vars: ${missingVars.join(", ")}`
    );
  }

  console.log("✅ All required VITE_ env vars are present.");
}
