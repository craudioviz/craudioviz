import dotenv from 'dotenv'
import fetch from 'node-fetch'

// Load environment variables
dotenv.config()

// Validate required env vars
const requiredVars = ['API_URL']
const missingVars = requiredVars.filter((key) => !process.env[key])
if (missingVars.length > 0) {
  console.error(`❌ Missing required env vars: ${missingVars.join(', ')}`)
  process.exit(1)
}

// Define endpoint
const API_URL = process.env.API_URL!
const MIGRATE_ENDPOINT = `${API_URL}/migrate`

// Optional auth key
const API_KEY = process.env.API_KEY || ''

// Optional payload
const payload = {
  trigger: process.env.MIGRATION_TRIGGER || 'manual',
  version: process.env.APP_VERSION || '1.0.0'
}

// Run migration
async function runMigration() {
  console.log(`🚀 Starting migration to: ${MIGRATE_ENDPOINT}`)

  try {
    const response = await fetch(MIGRATE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY && { Authorization: `Bearer ${API_KEY}` })
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ Migration successful:', result)
  } catch (err: any) {
    console.error('❌ Migration failed:', err.message || err)
    process.exit(1)
  }
}

runMigration()
