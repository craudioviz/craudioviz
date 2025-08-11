const requiredEnvVars = [
  "DATABASE_URL",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY"
];

export function validateEnvVars(): void {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((key) => console.error(`   - ${key}`));
    throw new Error("Environment validation failed.");
  }

  console.log("✅ All required environment variables are present.");
}

