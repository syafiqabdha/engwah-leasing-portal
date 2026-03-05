# 🏢 Engwah Leasing Portal

![Status](https://img.shields.io/badge/Status-Ready%20to%20Deploy-brightgreen?style=flat-square)
![Version](https://img.shields.io/badge/Version-v1.0-blue?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20PostgreSQL-informational?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-Enabled-purple?style=flat-square)
![Docker](https://img.shields.io/badge/Deploy-Docker%20Compose-2496ED?style=flat-square&logo=docker)

> A modern, enterprise-grade Property Management System for commercial real estate and shopping malls — with a built-in AI analyst, **Eva**.

---

## ✨ Why This System?

| Advantage | Description |
|---|---|
| 🚢 **Zero-Maintenance Deployment** | Entire stack is fully containerized with Docker — one command to run everything |
| 🏠 **Local-First** | Runs on your own server. No cloud charges, no vendor lock-in |
| 🧠 **Built-in AI (Eva)** | Context-aware AI assistant that reads your live database and answers leasing queries |
| 📱 **PWA Ready** | Install on iOS and Android directly from the browser — works like a native app |
| 🔐 **Production-Hardened** | JWT authentication with expiry, CORS allowlisting, RBAC, file type validation, rate limiting |
| 🔄 **Easy Updates** | Push to your Git remote and pull on the host to deploy any update |

---

## 🏗️ System Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                        USER BROWSER                           │
│               http://localhost:5173  (PWA installable)        │
└────────────────────────────┬──────────────────────────────────┘
                             │ HTTP / REST API
                             ▼
┌──────────────────────────────────────────────────────────────┐
│             FRONTEND  (React 19 + Vite)  :5173               │
│   Dashboard · Properties · Documents · Contacts · Eva Chat   │
└────────────────────────────┬─────────────────────────────────┘
                             │ Vite Proxy → /api → :5000
                             ▼
┌──────────────────────────────────────────────────────────────┐
│          BACKEND  (Node.js + Express + TypeScript)  :5000    │
│   Auth · RBAC · File Uploads · Announcements · Chat API      │
└────────┬──────────────────────────────────────┬─────────────┘
         │ Drizzle ORM                           │ LLM API
         ▼                                       ▼
┌─────────────────────┐            ┌─────────────────────────┐
│  PostgreSQL :5432   │            │  Ollama (Local LLM)     │
│  + pgvector ext.    │            │  :11434 (auto model     │
│  Data & Chat Logs   │            │   pull on startup)      │
└─────────────────────┘            └─────────────────────────┘
```

---

## 🔑 Key Features

### 🏢 Property & Unit Management
- Create and manage full **Mall portfolios** with photo uploads and location metadata
- Hierarchical **Level Management** (reorder, rename levels within each mall)
- Granular **Unit Tracking** per floor: status (`Vacant`, `Occupied`, `Reserved`), area, tenant name, person-in-charge
- Full M&E technical specs per unit: AC power, FCU count, water points, floor traps, drainage, gas pipe, kitchen exhaust, fire safety, data ports

### 🤖 Eva — AI Leasing Analyst
- Powered by a local **Ollama LLM** (default: `qwen2.5:1.5b`) or any **OpenAI-compatible cloud provider**
- Reads **live database context** on demand — knows every unit, tenant, document, and announcement
- Admin/Director can trigger `\refresh` to force Eva to reload her memory from the latest data
- Protected by per-user **rate limiting** (50 requests/hour) and **chat log audit trail**
- Supports rich **Markdown** formatted responses

### 📁 Document Repository
- Upload and categorize **Sales Kits**, **Ads Kits**, **Floor Plans**, and **Legal Documents**
- Each document is linked to a specific Mall property

### 👥 Contacts CRM
- Maintain a directory of **Tenants**, **Agents**, and **Vendors**
- Accessible to Admin, Director, and Staff roles

### � Announcements & Notifications
- System-wide **Notification Bell** for broadcast announcements
- Target announcements to a specific property or **General** (all-hands)
- Admin and Director can post and delete announcements

### 📊 Dashboard
- Live **occupancy metrics** and summary charts per property
- **Personal Notes** tied to calendar dates — visible to all team members
- **Team Status** indicator showing who is currently online

### 🌓 Dark / Light Mode
- User preference is saved to `localStorage` and applied automatically on next visit

---

## 🔐 Roles & Permissions

| Role | Description | Key Permissions |
|---|---|---|
| **Director** | Board-level executive access | Full system control — same as Admin. Post/delete announcements, manage all users and properties |
| **Admin** | System administrator | User management, all property operations, document management, announcement control |
| **Staff** | Operational team member | Edit units, upload documents, post announcements, view contacts |
| **Agent** | Read-only external access | View property availability and specs. Cannot edit or delete anything |

> **First-time setup:** On first launch, the portal will prompt you to create the initial Admin account. No default credentials are pre-seeded.

---

## 🛠️ Prerequisites

Before you start, make sure you have the following installed on your host machine:

- [**Docker**](https://docs.docker.com/get-docker/) (v24+)
- [**Docker Compose**](https://docs.docker.com/compose/install/) (v2+)

---

## 🚀 Installation & Execution

### Step 1 — Clone the Repository
```bash
git clone <your-repo-url>
cd ew-leasing-app
```

### Step 2 — Configure Environment Variables
```bash
cp backend/.env.example backend/.env
```
Then open `backend/.env` and set the required values:

```env
# --- REQUIRED IN PRODUCTION ---
JWT_SECRET=<generate with: openssl rand -hex 64>
DB_PASSWORD=<your-strong-database-password>
ALLOWED_ORIGINS=http://localhost:5173   # Add your domain for production

# --- AI / LLM Configuration ---
# Option A: Local Ollama (default, no key needed)
LLM_PROVIDER=ollama
LLM_MODEL=qwen2.5:1.5b
OLLAMA_HOST=http://ollama:11434
LLM_API_URL=http://ollama:11434/api/chat

# Option B: Cloud LLM (OpenAI-compatible)
LLM_PROVIDER=openai
LLM_MODEL=<your-cloud-model>
LLM_API_URL=<your-cloud-endpoint>
OLLAMA_API_KEY=<your-api-key>
```

### Step 3 — Start the Stack
```bash
docker-compose up --build
```

**What spins up:**

| Container | Description | Port |
|---|---|---|
| 🐘 `db` | PostgreSQL + pgvector (initialized via `init.sql`) | `127.0.0.1:5432` |
| ⚙️ `backend` | Node.js / Express REST API | `0.0.0.0:5000` |
| 🎨 `frontend` | React + Vite UI | `0.0.0.0:5173` |
| 🧠 `ollama` | Local LLM engine (auto-pulls model if missing) | `11434` |

### Step 4 — Open the Portal
```
http://localhost:5173
```
On **first launch**, you will be prompted to create your initial **Admin account**. No default passwords are pre-seeded.

> **📱 Install as PWA:** In your browser, tap *"Add to Home Screen"* to install the portal as a native-like app on iOS or Android.

---

## 📂 Project Structure

```
ew-leasing-app/
├── 🖥️  backend/
│   ├── src/
│   │   └── db/
│   │       ├── index.ts        # Drizzle DB connection
│   │       └── schema.ts       # Database table definitions
│   ├── .workspace/             # Eva AI persona & SOP files (mounted as Docker volume)
│   │   ├── Identity.md
│   │   ├── soul.md
│   │   ├── heart.md
│   │   ├── memory.md
│   │   └── sop.md
│   ├── uploads/                # User-uploaded files (malls, docs, avatars)
│   ├── server.ts               # Main Express server, all routes & AI logic
│   ├── .env.example            # Environment variable template
│   └── package.json
│
├── ⚛️  frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx          # Analytics, calendar, team status
│   │   │   ├── EvaChatbot.jsx         # AI chat interface
│   │   │   └── NotificationSystem.jsx # Announcements bell & panel
│   │   ├── App.jsx             # Main app, routing, all page components
│   │   ├── main.jsx            # React entrypoint
│   │   └── index.css           # Tailwind CSS 4 import
│   ├── public/
│   ├── vite.config.js          # Vite + PWA + API proxy config
│   └── package.json
│
├── 🐳  docker-compose.yml      # Development orchestration
├── 🐳  docker-compose.prod.yml # Production orchestration (Traefik)
├── 📜  init.sql                # PostgreSQL + pgvector schema bootstrap
├── 📖  schema.md               # Database schema reference
├── 🔒  SECURITY_REPORT.md      # Security audit notes
├── 📋  SETUP_DEPLOYMENT.md     # Detailed deployment guide
└── �  CHANGELOG.md            # Version history
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite (Rolldown), Tailwind CSS 4, Lucide React, Recharts, React Markdown |
| **Backend** | Node.js, Express, TypeScript, Drizzle ORM |
| **Database** | PostgreSQL 16 + pgvector extension |
| **Auth** | JWT (24h expiry) + bcryptjs |
| **File Handling** | multer (10MB limit, MIME validation) + sharp (image processing) |
| **AI Engine** | Ollama (local) or any OpenAI-compatible cloud endpoint |
| **Default LLM** | `qwen2.5:1.5b` (auto-downloaded on first run) |
| **Containerization** | Docker Compose |
| **PWA** | vite-plugin-pwa (Workbox) |

---

## 🗺️ Future Roadmap

| Feature | Description |
|---|---|
| 📦 **Inventory Tracker** | Real-time inventory management per property for the operations team |
| 💬 **Team Chat** | Dedicated in-app communication channels per property or department |
| ☁️ **Cloud File Hub** | Centralized, access-controlled shared document storage |
| 📊 **Advanced Analytics** | Occupancy trend graphs, lease expiry tracking, revenue forecasts |

---

<div align="center">

Built with ❤️ for the Engwah team.

</div>
