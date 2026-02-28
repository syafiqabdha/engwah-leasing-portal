# Production Deployment Guide (Simplified)

Deploying the Engwah Leasing System to a production environment. This guide outlines a simplified architecture using direct port exposure without a reverse proxy.

## 1. Architecture Overview

In a production environment, the infrastructure should be organized as follows:

*   **Frontend (Static Web Server):** A lightweight Nginx alpine container (`ew_ui`) serving the pre-built React static files, exposed directly on port `80`.
*   **Backend API (Node.js):** Runs via Docker (`ew_api`), exposed directly on port `5000`.
*   **Database (MySQL):** Runs via Docker (`ew_db`) on a private network holding a persistent Volume. The database port (3306) MUST NOT be exposed to the public internet.

## 2. Server Preparation

1.  **Provision a Linux Server:** Ubuntu 24.04 LTS or Debian 12 is recommended.
2.  **Point your Domain:** Configure your DNS provider to point `yourdomain.com` to your server's IP address.
3.  **Install Docker and Docker Compose:** Follow the official Docker installation guides.
4.  **Firewall Configuration (UFW):**
    ```bash
    sudo ufw allow OpenSSH
    sudo ufw allow 80/tcp
    sudo ufw allow 5000/tcp
    sudo ufw enable
    ```

## 3. Secure Secret Management & VITE_API_URL

**Never commit `.env` files to version control.**

1.  Clone the repository to your production server.
2.  Create a unified production `.env` file in the root directory:
    ```bash
    # Root .env file for docker-compose.prod.yml

    # CRITICAL: Since there is no reverse proxy routing /api on the same domain,
    # the frontend must know exactly where the backend is hosted.
    # Replace the IP or Domain below with your actual server address and port 5000.
    VITE_API_URL=http://your-server-ip-or-domain:5000/api

    # Database
    DB_HOST=db
    DB_USER=admin
    # Ensure these are strong, random passwords!
    DB_PASSWORD=your_secure_db_password
    MYSQL_ROOT_PASSWORD=your_secure_root_password
    DB_NAME=pancatz_leasing

    # App Secrets
    # Generate using: openssl rand -hex 64
    JWT_SECRET=your_super_secret_jwt_key

    # LLM Settings (if applicable)
    OLLAMA_HOST=http://ollama:11434
    LLM_MODEL=qwen2.5:1.5b
    LLM_PROVIDER=ollama
    # LLM_API_URL=http://ollama:11434/api/chat
    ```

## 4. Deploying the Application

Unlike development where we use Vite's dynamic server, production uses a pre-configured `docker-compose.prod.yml` and builds the frontend statically.

From the root of your project, run:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### What happens next?
1. Docker builds the frontend using `frontend/Dockerfile.prod`, running `npm run build` and packaging the static `/dist` files into a minimal Nginx container, baking in the `VITE_API_URL` you provided.
2. The Node.js backend builds.
3. The containers start, exposing the frontend on port `80` (HTTP) and the backend on port `5000`.

## 5. Database Backups

Implement an automated backup strategy for your MySQL database. A simple cron job running `mysqldump` from within the database container is a good starting point:

```bash
# Example Cron Job (runs daily at 2 AM)
0 2 * * * docker exec ew_db /usr/bin/mysqldump -u root --password='YOUR_ROOT_PASSWORD' pancatz_leasing > /path/to/backup/dir/backup_$(date +\%Y\%m\%d).sql
```
