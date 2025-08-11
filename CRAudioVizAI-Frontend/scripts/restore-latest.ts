import { execSync } from 'child_process'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config()

const BACKUP_PATH = process.env.BACKUP_PATH || './backups'
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
    console.error('❌ Missing DATABASE_URL in .env')
    process.exit(1)
}

// Find latest .sql file
function getLatestBackup(): string | null {
    if (!fs.existsSync(BACKUP_PATH)) return null

    const files = fs.readdirSync(BACKUP_PATH)
        .filter(f => f.endsWith('.sql'))
        .map(f => ({
            name: f,
            time: fs.statSync(path.join(BACKUP_PATH, f)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time)

    return files.length > 0 ? path.join(BACKUP_PATH, files[0].name) : null
}

const latestBackup = getLatestBackup()

if (!latestBackup) {
    console.error('❌ No backup file found in:', BACKUP_PATH)
    process.exit(1)
}

console.log(`🧼 Restoring from latest backup: ${latestBackup}`)

try {
    execSync(`psql "${DATABASE_URL}" < "${latestBackup}"`, {
        stdio: 'inherit',
        shell: process.env.ComSpec || '/bin/bash'
    })
    console.log('✅ Restore complete.')
} catch (err) {
    console.error('❌ Restore failed:', err)
    process.exit(1)
}