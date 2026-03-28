# Music Realtime — Amazon Q Developer Rules

## Project Overview
Real-time collaborative music listening app. Users create rooms and listen to music in sync via Firebase Realtime Database.

**Stack:** React 18 + TypeScript + Vite + MUI v5 + Redux Toolkit + Firebase + Formik + Yup

---

## Code Style & Convention

- **Language:** TypeScript strict mode, no `any` unless unavoidable
- **Indent:** 2 spaces
- **Quotes:** single quotes
- **Semicolons:** required
- **Max line length:** 150 characters
- **Trailing comma:** always in multiline
- **Import order:** builtin → external → internal (`src/`) → relative
  - React always first in external group
  - Empty line between each group
- **React import:** use `import * as React from 'react'` or named imports, never default `import React from 'react'`
- **Type imports:** always use `import type` for type-only imports

---

## Project Structure

```
src/
├── apis/           # Firebase URL builders (songUrl, userUrl, RoomsUrl, myFavoritesUrl)
├── components/     # Reusable UI components
│   ├── fields/     # Form field components (AutocompleteAsync)
│   └── ui/         # UI components (MusicPlayerSlider, ModalGlobal, SnackbarProvider, ...)
├── features/       # Page-level components
│   ├── Home/       # Song list + debounced search
│   ├── Login/      # Google OAuth login
│   ├── Rooms/      # Room list + create room
│   └── RoomDetail/ # Room detail + realtime sync
├── hook/           # Custom hooks (useStreaming, useRoomMutation)
├── layouts/        # App shell (Main.tsx — sidebar + topbar + MusicPlayerSlider)
├── models/         # TypeScript interfaces
├── routers/        # Route definitions + protectedLoader
├── service/        # Firebase init, httpRequest, event bus, Web Worker
├── store/          # Redux store (SongSlice, UserSlice)
├── theme/          # MUI dark/light theme
├── types-global/   # Global types (looseObj)
└── utils/          # Shared helpers (cloneObj, addOrRemoveUser, ...)
```

---

## Firebase Database Schema

```
/songs/{songId}         → name_song, name_authors, description, audio_url, image_song
/users/{userId}         → name, picture, ...googleProfile
/room/{roomId}          → name_room, idOwner, allowPassword, password, users[], songs[], currentSong, status
/my_favorites/{userId}  → {songId}: { id_song, image_song, id_user }
```

---

## Key Patterns

### HTTP / Firebase requests
Always use `httpRequest` service — never call Firebase SDK directly in components:
- `httpRequest.getData(url, ...query)` — get list as array with `_id`
- `httpRequest.getDataObj(url)` — get list as object keyed by id
- `httpRequest.getOne(url)` — get single record
- `httpRequest.getPost(url, data)` — create record
- `httpRequest.getPut(url, data)` — update record
- `httpRequest.getDelete(url)` — delete record

### URL builders (src/apis/request.ts)
```ts
songUrl(id?)        // 'songs' or 'songs/{id}'
userUrl(id?)        // 'users' or 'users/{id}'
RoomsUrl(id?)       // 'room' or 'room/{id}'
myFavoritesUrl(id?) // 'my_favorites' or 'my_favorites/{id}'
```

### Realtime streaming
Use `useStreaming` hook — never use Firebase `onValue` directly in components:
```ts
useStreaming({ url: RoomsUrl(id), callBack: (data) => { ... } });
```

### Global event bus (src/service/event.ts)
Use `publish` / `subscribe` / `unsubscribe` for cross-component communication:
```ts
// Show snackbar
publish(LIST_EVENT.SNACKBAR, { display: true, severity: 'success', message: '...' });

// Open global modal
publish(LIST_EVENT.MODAL_GLOBAL, { Component: MyForm, ComponentProps: { ... } });

// Sync song play/pause across room
publish(LIST_EVENT.CURRENT_SONG, { status: true, objSong: currentSong });
```

### Redux store
- `SongSlice` — current playing song, action: `triggerSong(songType)`
- `UserSlice` — logged-in user info, action: `loginUser(IUserInfo)`
- Access via `useSelector((state: RootState) => state[TYPE_REDUCER.SONG])`

### Protected routes
Routes `/rooms` and `/rooms/:idRoom` require login. Guard is handled by `protectedLoader` in `routers.ts` — checks `store.getState()[TYPE_REDUCER.USER].isLogin`.

### Music player sync flow
1. User clicks play → `togglePlayPause()` in `MusicPlayerSlider`
2. Publishes `LIST_EVENT.CURRENT_SONG` event
3. `RoomDetail` listens → calls `httpRequest.getPut(RoomsUrl(id), { currentSong, status })`
4. Firebase broadcasts to all clients via `useStreaming`
5. All clients receive new `status` → call `window.callbackFn?.(status)` to sync playback

---

## Component Conventions

- Functional components only, use `React.FC<Props>` typing
- Props type defined above component, extend `React.PropsWithChildren` when needed
- Use `makeStyles` from `@mui/styles` for component-scoped styles
- Use MUI components — do not use plain HTML elements for UI
- Forms: always use Formik + Yup validation
- Owner-only actions (kick user, change password): always check `isOwner` flag before rendering

---

## State Management Rules

- Global UI state (modal, snackbar) → event bus (`src/service/event.ts`)
- App-level state (current song, user) → Redux (`src/store/`)
- Local component state → `useState`
- Realtime Firebase data → `useStreaming` hook + local `useState`

---

## Testing

- Framework: **Vitest** + **@testing-library/react**
- Setup file: `src/setupTests.ts`
- Test files: co-located with source, named `*.test.ts` or `*.test.tsx`
- Run: `yarn test` (watch) | `yarn test --run` (once) | `yarn test:coverage`

---

## Environment Variables

All prefixed with `VITE_`. Never hardcode Firebase config — always use `import.meta.env.VITE_*`.

| Variable | Usage |
|---|---|
| `VITE_API_KEY` | Firebase API key |
| `VITE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_DATABASE_URL` | Firebase Realtime Database URL |
| `VITE_TIME_SEARCH` | Debounce delay (ms) for search inputs |

---

## Do's and Don'ts

**Do:**
- Use `cloneObj()` before mutating arrays from Firebase
- Use `addOrRemoveUser()` utility when adding/removing users from rooms
- Always unsubscribe event listeners in `useEffect` cleanup
- Use `import type` for TypeScript-only imports
- Suppress intentional `exhaustive-deps` warnings with `// eslint-disable-next-line react-hooks/exhaustive-deps`

**Don't:**
- Don't call Firebase SDK directly in components — use `httpRequest` or `useStreaming`
- Don't use `import React from 'react'` — use `import * as React` or named imports
- Don't use `{}` as a TypeScript type — use `Record<string, unknown>` or `object`
- Don't add deps to `useStreaming`'s `useEffect` — it's intentionally mounted once
- Don't use double quotes in code — single quotes only
