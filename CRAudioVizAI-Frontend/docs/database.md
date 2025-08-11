# 🗄️ Database Architecture – CR AudioViz AI

## 1. Supabase Schema Overview
- **Tables**: `users`, `projects`, `tools`, `sessions`
- **Auth**: Supabase Auth with JWT + RLS
- **Storage**: Supabase buckets for media assets

## 2. Modular Data Flow
- `users` → owns `projects`
- `projects` → contains `tools`
- `tools` → linked to `sessions` for runtime state

## 3. Error Handling
- ✅ Explicit error codes for auth failures
- 🔄 Retry logic for transient DB errors
- 🧼 Sanitization of user input before DB writes

## 4. Backup & Recovery
- 🔁 Daily Supabase exports (automated)
- 🧳 Local `.sql` dumps versioned in `/backups`
- ☁️ Cloud sync to encrypted S3 bucket

## 5. Migration Strategy
- `migrations/` folder with timestamped SQL files
- `CR-Forge-Setup.md` includes restore instructions

---

_Last updated: August 2025_