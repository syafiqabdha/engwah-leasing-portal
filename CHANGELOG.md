# Changelog — Engwah Leasing Portal

All notable changes to this project are documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-03-05 🎉 Initial Production Release

### 🔐 Security Hardening
- **[CRIT]** Removed hardcoded credential bypass (`password !== 'password'`) from login endpoint
- **[CRIT]** JWT tokens now issued with `24h` expiry on all auth routes (login + setup)
- **[CRIT]** CORS replaced from open wildcard to configurable `ALLOWED_ORIGINS` allowlist
- **[CRIT]** Added startup guard — server logs FATAL and exits in production if `JWT_SECRET` is unset
- **[MAJOR]** Multer file uploads now enforce 10MB size limit and strict MIME type allowlist (JPEG, PNG, WEBP, PDF, DOCX, XLSX)
- **[MAJOR]** PostgreSQL port rebound to `127.0.0.1` to prevent public network database exposure
- **[MINOR]** Announcement author now correctly resolved from JWT `email` field (previous value was always `"system"`)
- **[MINOR]** `OLLAMA_API_KEY` removed from `.env.example` template — replaced with safe placeholder

### 🎨 UI/UX — Focused Design Overhaul (Axiom Principles)
- Replaced heavy neumorphic theme with a clean, high-contrast minimal design system
- Removed animated CSS background and heavy `backdrop-filter` blurs to reduce GPU load
- Standardized all component styling via CSS variables (`--bg-color`, `--surface-color`, `--accent`, etc.)
- Replaced all gradient buttons with solid `bg-indigo-600` for consistent legibility
- Implemented **Dark Mode / Light Mode** toggle with `localStorage` persistence
- Dark mode injects `.dark` class on `<html>` and remaps all hardcoded Tailwind color classes

### 🤖 Eva AI Chatbot Enhancements
- Corrected initial greeting: fixed typo, swapped `user.username` → `user.firstName`
- Textarea auto-expands vertically as user types (no more clipping on multi-line input)
- `\refresh` command restricted to Admin and Director roles only
- Eva context is now manually refreshed on demand — removed any automatic periodic triggers
- Eva workspace files (`.workspace/`) remain hot-reloaded per chat without container restart

### 👥 Role & User Management
- Added **Director** role throughout the system (same permissions as Admin)
- Added `Director` option to the User Creation dropdown in the Users panel
- Admin and Director users can now update their own avatar directly from the Users grid (hover-activated camera overlay)
- Role badge for `admin` and `director` users displays in purple; other roles in slate

### 📣 Announcements / Notifications
- `canCreate` and `canDelete` permissions updated to include `director` role
- "Post Announcement" button restyles to `neu-btn neu-btn-primary` (removed gradient)

### 📊 Dashboard
- Replaced `glass-card` CSS class with standardized `neu-card` across all dashboard widgets
- Calendar dot rendering migrated from CSS class to Tailwind utility classes

### 🏗️ Infrastructure
- Added `SETUP_DEPLOYMENT.md` with step-by-step deployment guide including env vars, Docker, and AI config
- Created `FCA_AUDIT_REPORT.txt` — comprehensive Final Code Auditor security report
- `.prodignore/` folder created — quarantines all dev artifacts, AI persona files, and one-off scripts
- `.gitignore` updated to exclude `.prodignore/` from all git pushes
- Merged and resolved all git conflicts in `Readme.md`
- `Readme.md` fully rewritten to reflect current architecture, roles, tech stack, and env var requirements

---

## [0.5.0] — 2026-02-27 Dashboard UI Redesign

- Full dashboard UI redesign with recharts integration
- Calendar view with note-taking per date
- Team online/offline status via heartbeat API
- Announcement notification bell added to Navbar

---

## [0.4.0] — 2026-02-26 Ollama Cloud Integration

- Backend updated to support `LLM_PROVIDER=openai` for cloud-hosted models
- `LLM_API_URL` and `OLLAMA_API_KEY` environment variables introduced
- Dual-path rendering: local Ollama vs OpenAI-compatible cloud payloads

---

## [0.3.0] — 2026-02-25 Production Deployment with Traefik

- `docker-compose.prod.yml` created with Traefik reverse proxy
- SSL termination and service discovery via Traefik labels
- Multi-stage Dockerfile for frontend production build

---

## [0.2.0] — 2026-02-12 Markdown Chat & Eva Memory

- `react-markdown` integrated for rich text rendering in Eva's responses
- Chat history passed to LLM (last 6 messages as context window)
- Chat logs persisted to PostgreSQL with 30-day retention cleanup

---

## [0.1.0] — 2026-02-05 Foundation

- PostgreSQL + pgvector replacing MySQL
- Drizzle ORM migration from raw SQL
- `server.js` → `server.ts` TypeScript conversion
- Eva AI chatbot with `.workspace` persona system
- RBAC: Admin, Staff, Agent roles
- Full Docker Compose orchestration
