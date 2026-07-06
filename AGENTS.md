# AGENTS.md — Music Realtime

Single-page React app (Vite + SWC + TS) with Firebase Realtime Database backend.

## Quick commands

| Command | Purpose |
|---|---|
| `yarn start` | Dev server on **port 3000** |
| `yarn lint` | ESLint — **zero-warning policy** (`--max-warnings 0`) |
| `yarn test` | Vitest with jsdom globals |
| `yarn test:coverage` | Vitest + v8 coverage |
| `yarn build:dev` | Build + deploy to Firebase (calls `build-dev.sh`) |
| `npx tsc --noEmit` | Type-check (no dedicated npm script) |

Env files: `.env.development` (dev), `.env.uat` (staging), `.env.production` (prod), `.env` fallback. All vars prefixed `VITE_`.

Firebase projects: `music-realtime-34252` (default), `test12-873e4` (uat).

## Architecture gotchas

- **Firebase CRUD** goes through `src/service/httpRequest.ts` singleton (never import `firebase/database` directly — except `useStreaming` which wraps `onValue`, and `MyFavorites.tsx` which violates this rule).
- **Event bus** (`src/service/event.ts`): uses `document.addEventListener` / `CustomEvent` — not a library. Events: `CURRENT_SONG`, `SNACKBAR`, `MODAL_GLOBAL`.
- **`useStreaming`** (`src/hook/useStreaming.ts`) has `[]` deps intentionally — mounts once. Do not add deps.
- **`cloneObj()`** (JSON.parse/JSON.stringify) before mutating any Firebase array — Firebase returns frozen-like objects.
- **`window.callbackFn`** bridges Firebase realtime → `<audio>` element. Set in `main.tsx::callBack()`.
- **`protectedLoader`** reads Redux directly: `store.getState()['APP/USER'].isLogin` — must be careful about import order.
- **Imports** use `src/` path alias (configured in `tsconfig.json` and `vite.config.ts`).
- **`build-production.sh`** is broken/stale (references `test1.txt`). Use `npx vite build --mode production && firebase deploy --only hosting` instead.
- **`src/data/constants.ts`** is empty; **`src/service/httpRequest.ts`** has dead axios client code.

## Code style (ESLint enforced)

- Single quotes, 2-space indent, trailing commas in multiline, semicolons required
- Import order: builtin → external → `src/` internal → parent/sibling/index (blank lines between groups)
- `@typescript-eslint/consistent-type-imports: error` — use `import type` for type-only imports
- `@typescript-eslint/no-explicit-any: off` — `any` and `looseObj` type are explicitly permitted
- Unused vars OK if prefixed `_`
- `no-console: off` — console logging allowed

## Testing notes

- Only `src/utils/utils.test.ts` has real tests. `src/hook/hooks.test.ts` and `src/features/features.test.ts` are stubs.
- Utils tests mock `httpRequest`, `request.ts`, and `routers.ts` at module level with `vi.mock`.
- Test setup: `src/setupTests.ts` imports `@testing-library/jest-dom`.
- Run a single test file: `npx vitest run src/utils/utils.test.ts`.

## Project structure

| Directory | Role |
|---|---|
| `src/apis/` | Firebase URL builders (`songUrl`, `userUrl`, `RoomsUrl`, `myFavoritesUrl`) |
| `src/components/` | Reusable UI (FormCreateRoom, MusicPlayerSlider, ModalGlobal, Snackbar) |
| `src/features/` | Page-level components (Home, Login, Rooms, RoomDetail) |
| `src/hook/` | `useStreaming` (realtime Firebase subscribe), `useRoomMutation` |
| `src/layouts/` | App shell: sidebar, topbar, music player |
| `src/service/` | Firebase init, httpRequest CRUD, event bus, web worker |
| `src/store/` | Redux Toolkit: SongSlice (`triggerSong`), UserSlice (`loginUser`) |
| `src/routers/` | React Router v6 routes + `protectedLoader` guard |
