import dotenv from 'dotenv';

dotenv.config();

const requiredVars = [
    'API_URL',
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'DATABASE_URL',
    'JWT_SECRET',
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_API_BASE_URL',
    'VITE_APP_NAME'
];

const missing = requiredVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
    console.error(`❌ Missing required env vars:\n${missing.map(k => `- ${k}`).join('\n')}`);
    process.exit(1);
}

console.log('✅ All required env vars are present.');