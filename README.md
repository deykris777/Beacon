# 📟 Procmon

> **Real-time SaaS event monitoring, delivered to your Discord.**

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)

---

## ⚡ What is Procmon?

Procmon is a full-stack event monitoring app for SaaS teams. Your backend sends event pings to a simple HTTP API. Procmon stores the events, tracks monthly usage, and pushes real-time notifications to Discord. The dashboard lets users manage event categories, view event history, and upgrade plans.

## 🚀 Key Features

* **Real-time Discord notifications:** Send event pings and receive rich Discord embeds.
* **Event categories:** Organize events per user with name, emoji, and color.
* **Usage tracking:** Monthly quota limits for free vs pro plans.
* **Dashboard analytics:** Event history, delivery status, and field summaries.
* **Auth + payments:** Clerk auth and Stripe one-time checkout flow.

## 🛠️ Tech Stack

* **Framework:** Next.js 16
* **Language:** TypeScript
* **Database:** PostgreSQL with Prisma
* **Styling:** Tailwind CSS
* **Auth:** Clerk
* **Payments:** Stripe

---

## 🧭 How it works

1. User signs up via Clerk and Procmon creates a user record.
2. User creates event categories in the dashboard.
3. External services POST events to `/api/v1/events` with the API key.
4. Procmon stores the event, checks quota, and sends a Discord DM embed.
5. Dashboard displays event history and usage stats.

---

## ✅ Setup Guide

### Prerequisites

* Node.js 18+ (or Bun)
* PostgreSQL database
* Clerk account
* Stripe account
* Discord bot token

### 1) Install dependencies

```bash
bun install
```

### 2) Environment variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/procmon"

# Clerk
CLERK_WEBHOOK_SECRET=""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Discord
DISCORD_BOT_TOKEN=""
```

### 3) Generate Prisma client and push schema

```bash
bunx prisma generate
bunx prisma db push
```

### 4) Run the dev server

```bash
bun dev
```

Open `http://localhost:3000`.

---

## 📡 Example API request

```bash
curl -X POST "http://localhost:3000/api/v1/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "category": "signup",
    "description": "New user signed up",
    "fields": {"email": "user@example.com", "plan": "PRO"}
  }'
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

