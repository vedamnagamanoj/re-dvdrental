# 🎬 re-dvdrental — Next.js + Prisma + Docker + Neon

A modern full-stack **Next.js 15** application powered by **Prisma ORM** and a **PostgreSQL database** hosted on **Neon Cloud**.  
Fully containerized with **Docker** and set up for **automatic image builds and pushes** via **GitHub Actions**.

---

## 🚀 Features

- ⚡ **Next.js 15** (App Router)
- 🧩 **Prisma ORM** with PostgreSQL
- ☁️ **Neon Cloud** database (no local DB needed)
- 🐳 **Dockerized** for consistent builds
- 🤖 **GitHub Actions CI/CD** – auto builds & pushes to Docker Hub
- 🔐 **NextAuth (v4)** for authentication
- 💅 **Tailwind CSS** for styling
- 🧠 **TypeScript** for strong typing and maintainability

---

## 🧱 Project Structure

```
re-dvdrental/
├── app/                     # Next.js app router pages and APIs
│   └── api/
│       └── auth/            # NextAuth route
├── components/              # UI components
├── lib/                     # Utilities, Prisma client, auth config
├── prisma/                  # Prisma schema and migrations
├── public/                  # Static assets
├── Dockerfile               # Docker build instructions
├── .dockerignore            # Files excluded from Docker builds
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | Next.js 15 + React 19 |
| Backend | Next.js API Routes |
| ORM | Prisma |
| Database | PostgreSQL (Neon Cloud) |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Auth | NextAuth.js v4 |
| Styling | Tailwind CSS |

---

## 🧩 Prerequisites

Make sure you have the following installed:

- [Node.js ≥ 22](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [GitHub Account](https://github.com/)
- [Docker Hub Account](https://hub.docker.com/)
- A [Neon](https://neon.tech/) Postgres database

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```bash
DATABASE_URL=postgresql://<user>:<password>@<your-neon-host>/<database>?sslmode=require
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

> ⚠️ Never commit your `.env` file — it contains secrets.  
> Add a `.env.example` for documentation purposes.

---

## 🐳 Running the App with Docker

### Build the image
```bash
docker build -t re-dvdrental:v1 .
```

### Run the container
```bash
docker run -p 5000:3000 --env-file .env re-dvdrental:v1
```

Your app will be available at 👉 **http://localhost:5000**

---

## ☁️ Using Neon Cloud Database

You don’t need a local Postgres container — just connect using your **Neon connection string**.

Prisma automatically uses:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

To test the connection:
```bash
npx prisma db pull
```

---

## ⚙️ GitHub Actions (CI/CD)

This project includes a GitHub Actions workflow that:

1. Builds the Docker image  
2. Logs in to Docker Hub  
3. Pushes the image automatically on every push to `main`

### Add Secrets to GitHub

In your repo → **Settings → Secrets and Variables → Actions**

| Name | Value |
|------|--------|
| `DOCKER_USERNAME` | your Docker Hub username |
| `DOCKER_PASSWORD` | your Docker Hub access token |

---

## ⚡ GitHub Actions Workflow Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push
        uses: docker/build-push-action@v6
        with:
          push: true
          tags: manoj123/re-dvdrental:latest
```

*(Replace `manoj123` with your Docker Hub username.)*

---

## 🚀 Deploy to Cloud

You can deploy your Docker image directly from Docker Hub to:

- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Fly.io](https://fly.io/)
- [AWS ECS / Fargate](https://aws.amazon.com/ecs/)
- [Google Cloud Run](https://cloud.run/)

Example Render setup:
- Image: `manoj123/re-dvdrental:v1`
- Port: `3000`
- Environment: from `.env` (especially `DATABASE_URL`)

---

## 🧪 Local Development (non-Docker)

If you prefer to run locally:
```bash
pnpm install
pnpm dev
```

App runs at `http://localhost:3000`

---

## 📦 Build for Production

```bash
pnpm build
pnpm start
```

---

## 🧹 Useful Commands

| Command | Description |
|----------|--------------|
| `npx prisma generate` | Generate Prisma client |
| `npx prisma db push` | Push schema changes to database |
| `npx prisma studio` | Open Prisma Studio UI |
| `docker build -t <tag> .` | Build Docker image |
| `docker run -p 5000:3000 <tag>` | Run container |
| `docker push <username>/<repo>:<tag>` | Push image to Docker Hub |

---

## 🧠 Troubleshooting

| Issue | Solution |
|--------|-----------|
| PrismaClient not found | Run `npx prisma generate` |
| Database not connecting | Ensure `sslmode=require` in Neon connection string |
| Build fails in Docker | Add `RUN npx prisma generate` before `pnpm run build` |
| Image too large | Use multi-stage builds (already configured) |

---

## 📄 License

MIT License © 2025 [Naga Manoj V]

---

## ❤️ Credits

- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [Neon](https://neon.tech/)
- [Docker](https://www.docker.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
