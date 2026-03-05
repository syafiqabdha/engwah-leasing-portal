# Engwah Leasing App - Setup & Deployment Guide

This guide covers the initial configuration required for the project and how to package the application to Docker Hub for deployment.

## Initial Setup & Prerequisites

Before launching the app, configure the environment variables properly. Both the frontend and backend require a `.env` file based on `.env.example`.

### 1. Environment Variables Configuration

Create a `.env` file in the **backend** directory: `backend/.env`
```env
# Database configuration
DATABASE_URL=postgres://user:password@db:5432/engwah_db

# JWT Secret for Session Management
JWT_SECRET=super_secret_jwt_key_here

# LLM / AI Configuration (Ollama Cloud)
LLM_PROVIDER=cloud
LLM_MODEL=gpt-oss:20b-cloud
LLM_API_URL=https://api.your-ollama-cloud.com/v1/chat/completions # Adjust if different
OLLAMA_API_KEY=your_ollama_cloud_api_key_here
```

### 2. First-Time Database Setup

1. Start your database container or the full stack: `docker-compose up -d`.
2. Access the frontend app (e.g., http://localhost:5173).
3. The app will automatically redirect you to the **Setup Screen** because the database is completely empty.
4. Set up the first account. This account will automatically be granted the **`admin`** role.

### 3. Usage of LLM / AI

- Eva (the AI) has been configured to read the `OLLAMA_API_KEY`.
- If using Ollama Cloud or a protected Ollama Enterprise instance, ensure `OLLAMA_API_KEY` is provided. The app passes this automatically as a `Bearer` token.
- **Trigger `\refresh`**: Eva's memory no longer refreshes automatically on every property update. To sync her memory with the latest internal data, an Admin or Director must message her: `\refresh`.

---

## Packaging to Docker Hub

To publish your customized Engwah Leasing System images to Docker Hub, follow these steps.

### Step 1: Log in to Docker Hub
Authenticate with Docker using your Docker Hub credentials:
```bash
docker login
# Enter your username and password when prompted
```

### Step 2: Build the Production Images
Use the production-ready build commands to package the images. Replace `[YOUR_DOCKER_USERNAME]` with your actual username.

**For the Backend:**
```bash
cd backend
docker build -t [YOUR_DOCKER_USERNAME]/ew-leasing-backend:latest -f Dockerfile .
```

**For the Frontend:**
```bash
cd frontend
docker build -t [YOUR_DOCKER_USERNAME]/ew-leasing-frontend:latest -f Dockerfile.prod .
```

### Step 3: Push Images to Docker Hub
Push the local images to the Docker Hub repository:
```bash
docker push [YOUR_DOCKER_USERNAME]/ew-leasing-backend:latest
docker push [YOUR_DOCKER_USERNAME]/ew-leasing-frontend:latest
```

### Step 4: Update Production Docker Compose
On your production server, your `docker-compose.prod.yml` should now reference the Docker Hub images instead of building from the source:

```yaml
services:
  frontend:
    image: [YOUR_DOCKER_USERNAME]/ew-leasing-frontend:latest
    container_name: ew_frontend
    # ...

  backend:
    image: [YOUR_DOCKER_USERNAME]/ew-leasing-backend:latest
    container_name: ew_backend
    # ...
```

---

## Recent Application Improvements

- **Progressive Web App (PWA):** The web app is now fully PWA-enabled. Users on mobile devices and desktop can 'Install' the app directly to their device for an app-like experience.
- **Director Role:** Added the `Director` role, which parallels the `Admin` role with identical elevated system privileges across property and personnel management.
- **Eva Workflow Changes:** Eva now functions on a cache-on-command system to reduce load on the database. She provides AI-assisted responses strictly using cached info until an admin or director fires the `\refresh` command in her chat window.
- **UI/UX & Responsiveness:** Cleaned component boundaries, evaluated mobile views, and fine-tuned Tailwind elements for scalable viewport design handling spanning iOS, Android, and Desktop form factors.
