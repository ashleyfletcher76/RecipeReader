# 🍳 RecipeReader

A digital cookbook app that transforms handwritten family recipes into structured, searchable digital format.

## 🧠 Overview
RecipeReader uses on-device OCR (Apple Vision on iOS, Google ML Kit on Android) to recognize handwritten or printed recipes and convert them into structured text. The goal is to preserve family recipes privately, with optional cloud sync later.

## 🧩 Tech Stack
- **Frontend:** React Native + Expo (TypeScript, pnpm)
- **OCR:** Apple Vision & Google ML Kit via native modules
- **Storage:** SQLite (expo-sqlite)
- **CI/CD:** GitHub Actions (lint, typecheck, prettier)
- **Future Backend:** Spring Boot or Ktor + PostgreSQL

## 🚀 Run the App
```bash
cd frontend
pnpm install
pnpm start
```

## 🧰 Development Tools
```bash
Copy code
pnpm run lint
pnpm run typecheck
pnpm run format
```
