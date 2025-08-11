# CR Forge Setup ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂºÃ‚Â ÃƒÂ¯Ã‚Â¸Ã‚Â  
_Living blueprint for architecture, migration, and backup strategy._

---

## ÃƒÂ°Ã…Â¸Ã‚Â§Ã‚Â± Project Architecture

CR AudioViz is built for modularity, resilience, and creator empowerment.  
Every component is versioned, documented, and recoverable.

### ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â¹ Core Modules

- `frontend/` ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â React UI with Tailwind and Supabase Auth
- `backend/` ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Optional Node modules for extended logic
- `docs/` ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â Architecture notes, onboarding guides, and recovery plans
- `CR-Forge-Setup.md` ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â This file: setup, migration, and backup strategy

---

## ÃƒÂ°Ã…Â¸Ã…Â¡Ã¢â€šÂ¬ Initial Setup

### 1. **Clone the Repo**

```bash
git clone https://github.com/CRAudioVizAIAIAI/CRAudioVizAIAIAI.git
cd CRAudioVizAIAIAI/frontend
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

## ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ¢â‚¬Å¾ Migration & Backup Strategy

- **Version Control:** All code and docs are in Git. Use feature branches and PRs.
- **Database:** Use Supabase migrations (`supabase db push` and `supabase db dump`).
- **Backups:** Schedule regular exports of Supabase data and storage.
- **Docs:** Update `docs/` and this file with every major change.

---

## ÃƒÂ°Ã…Â¸Ã¢â‚¬Å“Ã‚Â Onboarding Checklist

- [ ] Clone repo & install dependencies
- [ ] Configure `.env`
- [ ] Run locally
- [ ] Read `docs/` for architecture and recovery
- [ ] Join team chat for support

---
## ÃƒÂ°Ã…Â¸Ã¢â‚¬ÂÃ‚Â Security Reference

For key boundaries, rotation, and vault storage, see [CR-Supabase-Security.md](./CR-Supabase-Security.md)

_Keep this file updated as the single source of truth for setup and recovery._