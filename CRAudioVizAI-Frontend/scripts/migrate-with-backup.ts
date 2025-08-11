import { execSync } from 'child_process'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config()

const BACKUP_PATH = process.env.BACKUP_PATH || './backups'
const AUTO_BACKUP = process.env.AUTO_BACKUP === 'true'
const RESTORE_MODE = process.env.RESTORE_MODE === 'true'

// Validate env before proceeding
try {
  execSync('npx ts-node scripts/validate-env.ts', { stdio: 'inherit' })
} catch {
  console.error('❌ Env validation failed. Aborting migration.')
  process.exit(1)
}

// Ensure backup folder exists
if (AUTO_BACKUP && !fs.existsSync(BACKUP_PATH)) {
  console.log(`📁 Creating backup folder: ${BACKUP_PATH}`)
  fs.mkdirSync(BACKUP_PATH, { recursive: true })
}

// Optional backup step
if (AUTO_BACKUP) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupFile = path.join(BACKUP_PATH, `pre-migration-${timestamp}.sql`)
  console.log(`📦 Backing up database to: ${backupFile}`)

  try {
    execSync(`pg_dump "${process.env.DATABASE_URL}" > "${backupFile}"`, {
      stdio: 'inherit',
      shell: process.env.ComSpec || 'cmd.exe'
    })
    console.log('✅ Backup complete.')
  } catch (err) {
    console.error('❌ Backup failed:', err)
    process.exit(1)
  }
}

// Optional restore mode
if (RESTORE_MODE) {
  console.log('🧼 Restore mode enabled. Skipping migration.')
  process.exit(0)
}

// Run migration
try {
  execSync('npx ts-node scripts/migrate-db.ts', { stdio: 'inherit' })
} catch {
  console.error('❌ Migration failed.')
  process.exit(1)
}
