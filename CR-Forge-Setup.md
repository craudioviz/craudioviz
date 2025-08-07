# CR Forge Setup 🛠️  
_Living blueprint for architecture, migration, and backup strategy._

---

## 🧱 Project Architecture

CR AudioViz is built for modularity, resilience, and creator empowerment.  
Every component is versioned, documented, and recoverable.

### 🔹 Core Modules

- `frontend/` — React UI with Tailwind and Supabase Auth
- `backend/` — Optional Node modules for extended logic
- `docs/` — Architecture notes, onboarding guides, and recovery plans
- `CR-Forge-Setup.md` — This file: setup, migration, and backup strategy

---

## 🚀 Initial Setup

### 1. **Clone the Repo**

```bash
git clone https://github.com/craudioviz/craudioviz.git
cd craudioviz/frontend
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Configure Environment**

Copy the example environment file and update credentials as needed:

```bash
cp .env.example .env
# Edit .env with your Supabase keys and other secrets
```

### 4. **Run the App**

```bash
npm run dev
```

---

## 🔄 Migration & Backup Strategy

- **Version Control:** All code and docs are in Git. Use feature branches and PRs.
- **Database:** Use Supabase migrations (`supabase db push` and `supabase db dump`).
- **Backups:** Schedule regular exports of Supabase data and storage.
- **Docs:** Update `docs/` and this file with every major change.

---

## 📝 Onboarding Checklist

- [ ] Clone repo & install dependencies
- [ ] Configure `.env`
- [ ] Run locally
- [ ] Read `docs/` for architecture and recovery
- [ ] Join team chat for support

---

_Keep this file updated as the single source of truth for setup and recovery._