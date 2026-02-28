# Engwah Leasing Portal: System Proposal & User Guide

**Date:** 2026-02-12
**Version:** 3.0 (Security & Intelligence Update)
**Status:** Production-Ready

---

# Part 1: Executive Proposal

## 1.1 Executive Summary
The **Engwah Leasing Portal (v3.0)** is an enterprise-grade Property Management System that has evolved beyond a simple inventory tool into an intelligent business assistant. This release introduces **Eva 3.0**, a "Senior Commercial Leasing Analyst" AI, capable of understanding complex technical specifications (M&E, HVAC, Connectivity) and enforcing strict security protocols. With the addition of **Sudo-level access**, robust rate limiting, and rich text communication, the system now meets rigorous operational standards for reliability and data protection.

## 1.2 Key Value Propositions
*   **Centralized Truth & Document Intelligence**: A single source of truth for all Malls, Units, Tenants, and Contracts. Eva now indexes and provides direct links to uploaded **Sales Kits** and **Floor Plans**.
*   **Expert AI Analysis**: Eva understands industry-standard terminology (e.g., "60A TPN", "Floor Traps", "FCU Count") and provides detailed technical breakdowns in rich-text format (tables, lists, bold emphasis).
*   **Enhanced Security & Governance**:
    *   **Rate Limiting**: AI usage is capped (50 req/hr) to prevent abuse and manage costs.
    *   **Role-Based Access (Sudo/Admin)**: Strict hierarchy ensures only authorized personnel can request data mutations.
    *   **Audit Trails**: All AI conversations are logged for compliance and review (30-day retention).
*   **Zero-Maintenance Infrastructure**: Built on Docker containerization with self-healing capabilities (e.g., automatic network tunnel restart).

## 1.3 Technology Stack
The application utilizes a modern, future-proof stack:
*   **Frontend**: React.js (Vite) + Tailwind CSS + **Markdown Rendering** (Rich Text UI).
*   **Backend**: Node.js (Express) REST API with **Event-Driven Architecture**.
*   **Database**: MySQL 8.0 (Relational Data Integrity) with automated schema migration.
*   **AI Engine**: Hybrid support for **Ollama (Local)** or **OpenAI/Cloud** APIs, featuring Context-Augmented Generation (RAG).
*   **Infrastructure**: Docker Compose + Tailscale (Secure Networking) + **Persistent Funnel Scripts**.

---

# Part 2: Technical Architecture Analysis

## 2.1 System Components
1.  **Presentation Layer (Frontend)**:
    *   Responsive "Glassmorphism" UI with Markdown support (Tables, Links, Code Blocks).
    *   Real-time Notification System (Announcements).
    *   Interactive Mall & Unit Dashboards with "Click-to-Copy" utility.
    *   Secure JWT-based Authentication.
2.  **Logic Layer (Backend API)**:
    *   **Event-Driven Context**: AI memory refreshes immediately upon data changes (Create/Edit Unit).
    *   **Rate Limiter & Moderation**: Protects the AI endpoint from spam and offensive content.
    *   **Chat Logger**: Archives conversations to MySQL for 30 days.
3.  **Data Layer (MySQL)**:
    *   Structured tables for `malls`, `units`, `users`, `documents`, `contacts`, `announcements`, and **`chat_logs`**.
    *   Default **Sudo User** generation for recovery access.
4.  **AI Layer (Eva)**:
    *   **Persona**: "Senior Commercial Leasing Analyst".
    *   **Knowledge Graph**: Deep integration with Units, Documents, Notifications, and Contacts directory.

## 2.2 Security Features
*   **Role-Based Access Control (RBAC)**:
    *   `Sudo` (Super Admin): Full system control, Database mutations, Emergency access.
    *   `Admin`: User management, Property management.
    *   `Staff`: Operational access (Edit units, Upload docs).
    *   `Agent`: Read-only access to availability and specs.
*   **Data Protection**:
    *   **Password Redaction**: AI context strictly excludes user credentials.
    *   **Input Sanitization**: Prevents injection attacks and offensive language.
*   **Network Security**:
    *   No public port exposure required; relies on secure Tunnels (Tailscale).

---

# Part 3: Comprehensive User Guide

## 3.1 Getting Started

### Accessing the System
*   **Local Office**: Open your browser and navigate to `http://localhost:5173`.
*   **Remote / Mobile**: Use the provided secure link (e.g., `https://syafiq-nb.tail5e6f37.ts.net`).

### Logging In
1.  Enter your assigned **Username** and **Password**.
2.  Click **Secure Login**.
    *   **Super Admin (Sudo)**: `sudo` / `password` (Use for critical system changes).
    *   *Default Admin*: `admin` / `admin` (Please change immediately).

## 3.2 For Administrators & Staff

### Managing Properties (Malls)
1.  Navigate to the **Properties** tab.
2.  **Add Property**: Click "Manage Properties" -> "Add New".
3.  **Edit/Delete**: Use the Pencil or Trash icon on existing cards.

### Managing Units & Documents
1.  Click on any Property Card to enter the **Mall Detail View**.
2.  **Add Unit**: Click the "+" button. Fill in details like Unit No, Area, Price, and Status.
3.  **Technical Specs**: Input Power (KW), FCU counts, Floor Traps, etc. **Eva reads this instantly.**
4.  **Documents**: Upload Sales Kits or Floor Plans. Eva will provide links to these files in chat.

### Notification System
*   Click the **Bell Icon** to view announcements.
*   **Post Announcement**: Click "Post Announcement" in the panel. Select a target property or "General". This will alert all logged-in users.

## 3.3 For Agents (Read-Only)

### Checking Availability
1.  Log in and select a Property.
2.  Use the **Availability Filter** buttons (All / Vacant / Occupied) to quickly find open units.
3.  Click "View Specs" on any unit to see detailed engineering data (Power, Water, Gas).
4.  **Copy Info**: Click "Click to Copy" in the unit modal to instantly grab a formatted summary for WhatsApp/Email.

### Using Eva (AI Assistant)
Eva is your 24/7 expert. Click the **"Ask Eva"** button in the bottom right.
*   **Rich Text**: Eva now responds with formatted tables, lists, and bold text.
*   **Documents**: Ask "Show me the sales kit for Centrepoint" -> Retrieve a clickable link.
*   **Technical**: "How many FCU units are in #01-05?" or "List units with >60A power."
*   **Contacts**: "Who is the contact for HVAC maintenance?"
*   **Logout**: Type "logout" or "close" to securely sign out via chat.

## 3.4 Troubleshooting

**"Rate limit exceeded"?**
*   You have sent more than 50 messages in an hour. Please wait or contact a Sudo admin.

**"Network Error" on Mobile?**
*   Ensure you are using the HTTPS Tailscale link, not the Localhost link.
*   Refresh the page.

**Eva not answering accurately?**
*   Ensure the unit data is entered correctly in the "Technical Specifications" section. Eva reads directly from the live database.
