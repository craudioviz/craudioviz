import dotenv from 'dotenv'
import { execSync } from 'child_process'
import { URL } from 'url'

dotenv.config()

const dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
  console.error('❌ DATABASE_URL is missing from .env')
  process.exit(1)
}

try {
  const parsed = new URL(dbUrl)
  const user = parsed.username
  const password = parsed.password ? '••••••••' : '(none)'
  const host = parsed.hostname
  const port = parsed.port || '5432'
  const dbName = parsed.pathname.replace('/', '')

  console.log(`🔍 Parsed DATABASE_URL:`)
  console.log(`  🧑 User: ${user}`)
  console.log(`  🔐 Password: ${password}`)
  console.log(`  🖥️ Host: ${host}`)
  console.log(`  📡 Port: ${port}`)
  console.log(`  🗄️ Database: ${dbName}`)

  console.log(`🧪 Testing connection with psql...`)
  execSync(`psql "${dbUrl}" -c "SELECT 1;"`, {
    stdio: 'inherit',
    shell: process.env.ComSpec || 'cmd.exe'
  })

  console.log('✅ Connection successful.')
} catch (err: any) {
  console.error('❌ Connection failed:', err.message || err)
  process.exit(1)
}
