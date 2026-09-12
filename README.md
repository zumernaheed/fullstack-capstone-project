# GiftLink - Fullstack Capstone Project

GiftLink connects people who want to give away usable household items with people who prefer reuse and recycling over buying new items.

## Project structure

- `giftlink-backend` - Node.js, Express, MongoDB, JWT
- `giftlink-frontend` - React + Vite
- `giftItems.json` - 16 seed gift documents
- `user-story.md` - user story template required by the rubric
- `evidence` - text evidence files for cURL and MongoDB output

## Local setup

1. Copy `giftlink-backend/.env.example` to `giftlink-backend/.env`.
2. Add your MongoDB connection string and JWT secret.
3. Import `giftItems.json` into the `giftlink` database, `gifts` collection.
4. Run `npm install` in both backend and frontend directories.
5. Start backend with `npm run dev`.
6. Start frontend with `npm run dev`.

Do not commit `.env`.
