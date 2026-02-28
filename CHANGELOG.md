# System Log & Changelog
**Date:** 2026-02-27
**Target Application:** Engwah Leasing System

## Core Architectural Upgrades

### 1. Database Layer Transformation (MySQL -> PostgreSQL)
- **Engine Replacement**: Removed `mysql:8.0` from both development and production `docker-compose` clusters. Exchanged with `pgvector/pgvector:pg16` to provide out-of-the-box semantic search capacity for the LLM.
- **ORM Integration**: Stripped raw `mysql2` strings and implemented **Drizzle ORM** within a natively typed environment (`server.js` -> `server.ts`).
- **Type-Safety Enforcement**: Configured `package.json` to leverage `tsx` (TypeScript Execute) for instant server compilation, fortifying all backend payload structures to mimic original API schema definitions natively.
- **Schema Mapping**: Deployed comprehensive TypeScript definitions mimicking the original legacy application via `src/db/schema.ts`, including mapping features for real-time JSONB elements and array indexing to optimize property iterations.

### 2. Node.js Dependency Resolution (`bcrypt_lib.node` execution crash)
- **Problem**: Host-compiled C++ binaries from `bcrypt` triggered an `ERR_DLOPEN_FAILED: Exec format error` when attempting to mount deeply inside the `node:18-alpine` Alpine Linux instance container.
- **Solution**: Removed the platform-dependent `bcrypt` library globally and standardized the environment with `bcryptjs` (a pure-JavaScript cross-platform cryptographic port). Successfully booted and connected the Docker registry.

### 3. Model Context Protocol (MCP) Design & Implementation
- Generated `schema.md` within the application root to establish the canonical reference map for abstract AI integration routines.
- Injected `embedding vector(384)` logic within the property structure (the `units` table) natively tracking real estate spaces systematically inside PostgreSQL against vector distance algorithms.

### 4. Eva's Live Cognitive Framework (`.workspace`)
Created and permanently mounted the `/.workspace` knowledge layer within the backend API logic. Eva dynamically assesses these 5 core `.workspace` files dynamically via `fs.readFileSync` per-chat, enabling live "hot loads" of her persona without needing to reboot the Docker instance:
- **`Identity.md`**: Implemented strict, formal conversational styles mirroring a Senior Leasing Analyst while enforcing Read-Only role logic against `agent` and `staff` hierarchies.
- **`soul.md`**: Defined her autonomous property analytical function.
- **`heart.md`**: Sequenced the contextual `refreshEvaContext` event triggers that "breathe" live properties/units payload JSON into her immediate LLM memory bank.
- **`memory.md`**: Programmed 30-day PostgreSQL retention constraints layered over native pgvector embeddings mapping abstract semantic descriptions.
- **`sop.md`**: Hardcoded operational step-by-step logic rules she applies immediately prior to evaluating response payloads in markdown syntax.

All infrastructure was subsequently verified against `docker-compose up --build` with live confirmation that the Node application (`ew_api`) instantiated port 5000 successfully and connected to PostgreSQL natively with Eva's brain framework loaded.
