# 🏢 Engwah Leasing Portal

> A modern, enterprise-grade Property Management System for commercial real estate and shopping malls — with a built-in AI analyst, **Eva**.

![Status](https://img.shields.io/badge/Status-Ready%20to%20Deploy-brightgreen?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20PostgreSQL-informational?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Docker%20Compose-2496ED?style=flat-square&logo=docker)

## 📋 Overview
The Engwah Leasing Portal is a containerized, full-stack application designed to streamline the management of retail properties, units, tenants, and commercial documents. It features a unique, context-aware AI assistant (Eva) that interfaces directly with the live database to provide insights.

[Insert Screenshot: Main Dashboard view showing property metrics and occupancy charts]

## 🏗️ Visual Architecture & Flows

### System Architecture
```mermaid
graph TD
    Client[User Browser - PWA / React 19] -->|HTTP / REST API| Frontend[Frontend: Vite on Port 5173]
    Frontend -->|API Proxy: /api| Backend[Backend: Express / Node.js on Port 5000]
    Backend -->|Drizzle ORM| Database[(PostgreSQL + pgvector on Port 5432)]
    Backend -->|REST| LocalLLM[Ollama Local LLM on Port 11434]

    subgraph Storage
      Database
    end

    subgraph AI Engine
      LocalLLM
    end
```

### Database Schema (ERD)
```mermaid
erDiagram
    users {
        int id PK
        string email
        string password_hash
        string first_name
        string last_name
        string role "admin, director, staff, agent"
    }
    malls {
        int id PK
        string name
        string location
        string image_url
    }
    units {
        int id PK
        int mall_id FK
        string unit_no
        string level
        string status "vacant, occupied, reserved"
        decimal area_sqm
        string tenant_name
    }
    sales_kits {
        int id PK
        int mall_id FK
        string title
        string type "sales, ads, floorplan, others"
        string file_url
    }
    contacts {
        int id PK
        string name
        string email
        string type "Tenant, Agent, Vendor"
    }
    announcements {
        int id PK
        string title
        string target_property "Specific mall or General"
        date expiry_date
    }
    chat_logs {
        int id PK
        int user_id FK
        string message
        string response
    }

    malls ||--o{ units : "contains"
    malls ||--o{ sales_kits : "has documents"
    users ||--o{ chat_logs : "creates"
```

### User Journey Flow
```mermaid
flowchart LR
    Start([Login Screen]) --> Auth{Authenticated?}
    Auth -- Yes --> Dashboard[Dashboard Home]
    Auth -- No --> Start

    Dashboard --> Properties[Manage Properties & Units]
    Dashboard --> Documents[Upload & View Documents]
    Dashboard --> Contacts[CRM / Contacts]
    Dashboard --> AI[Chat with Eva AI]

    Properties --> EditUnit[Edit Unit Specs & Tenant Info]
    Documents --> UploadDoc[Upload Sales Kits / Ads]
    AI --> Ask[Ask Property Questions]
```

## ✨ Key Features

*   **🏢 Property & Unit Management**: Manage mall portfolios with photo uploads. Granular tracking of level orders and units (status, area, tenant details, M&E specs).

    [Insert Screenshot: Property Management view listing malls and units]

*   **🤖 AI Leasing Analyst (Eva)**: Powered by a local Ollama LLM (`qwen2.5:1.5b`), Eva reads live database context to answer complex property queries.

    [Insert Screenshot: Eva AI Chat interface showing an example query about property availability]

*   **📁 Document Repository**: Upload and categorize Sales Kits, Ads, Floor Plans, and Legal Documents securely. Linked directly to specific malls.

    [Insert Screenshot: Document Repository showing categorized uploaded files]

*   **👥 Contacts CRM**: Directory of Tenants, Agents, and Vendors accessible to authorized roles.
*   **🔔 Announcements System**: Broadcast system-wide or property-specific notifications with optional expiry dates.
*   **🔐 Role-Based Access Control (RBAC)**: Secure JWT authentication with `admin`, `director`, `staff`, and `agent` roles.

### Planned / WIP Features
*   *Inventory Tracker* (Planned)
*   *Team Chat* (Planned)
*   *Cloud File Hub* (Planned)
*   *Advanced Analytics / Revenue Forecasts* (Planned)

## 🧰 Tech Stack

*   **Frontend**: React 19, Vite (Rolldown), Tailwind CSS 4, Lucide React, Recharts
*   **Backend**: Node.js, Express, TypeScript, Drizzle ORM
*   **Database**: PostgreSQL 16 + `pgvector` extension
*   **AI Engine**: Ollama (Local LLM - `qwen2.5:1.5b`)
*   **Infrastructure**: Docker, Docker Compose

## 🚀 Getting Started

### Prerequisites
*   [Docker](https://docs.docker.com/get-docker/) (v24+)
*   [Docker Compose](https://docs.docker.com/compose/install/) (v2+)

### Installation & Run

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <project-folder>
    ```

2.  **Environment Setup:**
    ```bash
    cp backend/.env.example backend/.env
    ```
    Configure the variables in `backend/.env` (especially `JWT_SECRET` and `DB_PASSWORD`).

3.  **Start Services via Docker Compose:**
    ```bash
    docker-compose up --build
    ```
    This spins up the Database (`pgvector`), Backend (`API`), Frontend (`React`), and the Local LLM (`Ollama`).

4.  **Access the Portal:**
    Open `http://localhost:5173` in your browser. On the first launch, you will be prompted to create your initial Admin account.

## 📂 Project Structure

```
.
├── backend/            # Express Node.js API
│   ├── src/            # Core logic (DB, schema)
│   ├── .workspace/     # AI personas & SOPs
│   ├── uploads/        # System storage (images, docs)
│   ├── server.ts       # API & App entrypoint
│   └── package.json
├── frontend/           # React + Vite application
│   ├── src/            # React components (Dashboard, App.jsx, etc.)
│   ├── public/         # Static assets
│   ├── vite.config.js  # Vite settings
│   └── package.json
├── docker-compose.yml  # Local Docker configuration
├── init.sql            # Postgres database initialization script
└── schema.md           # Database documentation details
```
