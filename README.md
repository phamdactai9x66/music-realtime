# 🎵 Music Realtime

A real-time collaborative music listening web app. Users can create rooms, invite others, and listen to music together in sync — play/pause is synchronized across all users in the same room.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Firebase Setup](#firebase-setup)
- [Project Structure](#project-structure)
- [Business Flow](#business-flow)
- [Deployment](#deployment)

---

## ✨ Features

- 🔐 Google OAuth login via Firebase Authentication
- 🏠 Home page with song list and debounced search
- 🚪 Create and manage music rooms (with optional password protection)
- 🎧 Real-time music sync — play/pause is broadcast to all users in the room
- 👥 See active users in a room with live presence indicators
- 🦶 Kick users from a room (owner only)
- 🔑 Change room password (owner only)
- ❤️ Add songs to favorites
- 🌗 Dark / Light theme toggle
- 🌐 Global modal and snackbar system via custom event bus

---

## 🛠 Tech Stack

| Category | Library |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite + SWC |
| UI | MUI (Material UI) v5 |
| State Management | Redux Toolkit |
| Routing | React Router DOM v6 |
| Backend / DB | Firebase Realtime Database |
| Auth | Firebase Authentication (Google) |
| Form | Formik + Yup |
| HTTP | Axios (configured), Firebase SDK (active) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Yarn or npm
- Firebase project (see [Firebase Setup](#firebase-setup))

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd music-realtime

# Install dependencies
yarn
```

### Running locally

```bash
# Development mode (port 3000)
yarn start

# UAT mode
yarn uat:env

# Production mode
yarn production:env
```

---

## 🔑 Environment Variables

Create the appropriate `.env` file based on your environment. All variables must be prefixed with `VITE_`.

| Variable | Description |
|---|---|
| `VITE_API_KEY` | Firebase API key |
| `VITE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_PROJECT_ID` | Firebase project ID |
| `VITE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_APP_ID` | Firebase app ID |
| `VITE_MEASUREMENT_ID` | Firebase analytics measurement ID |
| `VITE_DATABASE_URL` | Firebase Realtime Database URL |
| `VITE_TIME_SEARCH` | Debounce delay (ms) for search inputs |

### Available env files

| File | Purpose |
|---|---|
| `.env` | Default fallback |
| `.env.development` | Local development |
| `.env.local` | Local overrides (gitignored) |
| `.env.uat` | UAT environment |
| `.env.production` | Production environment |

---

## 🔥 Firebase Setup

### 1. Create a Firebase project

Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.

### 2. Enable services

- **Authentication** → Sign-in method → Enable **Google**
- **Realtime Database** → Create database → Start in test mode (configure rules for production)

### 3. Database rules (recommended for production)

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### 4. Database schema

```
/
├── songs/
│   └── {songId}/
│       ├── name_song
│       ├── name_authors
│       ├── description
│       ├── audio_url
│       └── image_song
│
├── users/
│   └── {userId}/
│       ├── name
│       ├── picture
│       └── ...googleProfile
│
├── room/
│   └── {roomId}/
│       ├── name_room
│       ├── idOwner
│       ├── allowPassword
│       ├── password
│       ├── users[]         ← list of user IDs
│       ├── songs[]         ← list of song IDs
│       ├── currentSong     ← ID of currently playing song
│       └── status          ← true = playing, false = paused
│
└── my_favorites/
    └── {userId}/
        └── {songId}/       ← favorited songs
```

### 5. Copy Firebase config to your `.env` file

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id
VITE_DATABASE_URL=https://your_project-default-rtdb.region.firebasedatabase.app
```

---

## 📁 Project Structure

```
src/
├── apis/           # Firebase URL builders
├── components/     # Reusable UI components & form fields
├── features/       # Page-level feature components (Home, Login, Rooms, RoomDetail)
├── hook/           # Custom hooks (useStreaming, useRoomMutation)
├── layouts/        # App shell layout (sidebar, topbar, music player)
├── models/         # TypeScript interfaces
├── routers/        # Route definitions & protected route loader
├── service/        # Firebase init, HTTP wrapper, event bus, Web Worker
├── store/          # Redux store, SongSlice, UserSlice
├── theme/          # MUI dark/light theme config
├── types-global/   # Global TypeScript types
└── utils/          # Shared utility functions
```

> See [STRUCTURE.md](./STRUCTURE.md) for the full annotated file tree.

---

## 🔄 Business Flow

### Authentication
1. User clicks **Login with Google** → Firebase popup OAuth
2. On success, check if user exists in `/users/{id}`
3. If new user → create record in DB
4. Save user info to Redux → redirect to Home

### Home
- Fetch all songs from `/songs`
- Debounced search filters by `name_song`
- Click a song → dispatches to Redux → triggers global music player

### Rooms
- Lists all rooms from `/room` with real-time updates
- Search rooms by `name_room`
- Create room via modal (name + optional password)

### Room Detail
- Subscribes to `/room/{id}` via Firebase `onValue`
- All users in the room hear the same song, play/pause in sync
- Owner can: add/remove songs, kick users, change password
- Leaving the room removes the user from `/room/{id}/users`

### Music Player
- Fixed at the bottom of the screen
- Syncs play/pause state across all room members via Firebase
- Uses `window.callbackFn` to control playback from realtime events

---

## 🚢 Deployment

The project is deployed to **Firebase Hosting**.

```bash
# Build and deploy to development
yarn build:dev

# Manual build for production
npx vite build --mode production
firebase deploy --only hosting
```

> Make sure you have the Firebase CLI installed and are logged in:
> ```bash
> npm install -g firebase-tools
> firebase login
> ```
