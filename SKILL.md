# 🧠 SKILL — Music Realtime Codebase Guide

> Generated from `.codegraph/codegraph.db` — static analysis of all nodes, edges (calls/imports/references).

---

## 📐 Architecture Overview

```
main.tsx
  └── App.tsx
        ├── initRequest()          ← khởi tạo Firebase DB instance
        ├── useThemeRoot()         ← dark/light theme
        ├── RouterProvider         ← react-router-dom
        ├── ModalGlobal            ← global modal via event bus
        └── CustomizedSnackbar     ← global snackbar via event bus
```

---

## 🗺️ Code Graph — Call Flow

### Entry Point
```
main.tsx
  └── callBack()
        └── App()
```

### Auth Flow
```
Login
  ├── initRequest().getOne(userUrl(id))     ← check user exists
  ├── initRequest().getPost(userUrl(), data) ← create new user
  ├── publish(LIST_EVENT.SNACKBAR, ...)      ← show toast
  └── publish(LIST_EVENT.MODAL_GLOBAL, ...)  ← close modal
```

### Home Flow
```
Home
  ├── initRequest().getData(songUrl())       ← fetch all songs
  └── ListSongs                              ← render list, onClick → Redux triggerSong()

StandardImageList (SlideImage)
  ├── useStreaming(myFavoritesUrl())          ← realtime favorites
  ├── initRequest().getPost/getDelete(...)   ← toggle favorite
  └── cloneObj()                             ← safe mutation
```

### Rooms Flow
```
Rooms (list)
  ├── useStreaming(RoomsUrl())                ← realtime room list
  ├── initRequest().getData(RoomsUrl())      ← initial fetch
  ├── publish(LIST_EVENT.MODAL_GLOBAL, { Component: CreateRoom })
  └── ListRooms
        ├── addOrRemoveUser(idUser, idRoom, 'ADD')   ← join room
        ├── initRequest().getDelete(RoomsUrl(id))    ← delete room (owner)
        └── publish(LIST_EVENT.MODAL_GLOBAL, { Component: VerifyPassword })
```

### Room Detail Flow (core sync)
```
Rooms (RoomDetail)
  ├── useStreaming(RoomsUrl(id))              ← subscribe realtime
  │     └── callBack(data)
  │           ├── convertData(users)         ← fetch user details
  │           ├── convertData(songs)         ← fetch song details
  │           └── window.callbackFn?(status) ← sync play/pause
  │
  ├── subscribe(LIST_EVENT.CURRENT_SONG)     ← listen from MusicPlayer
  │     └── getPut(RoomsUrl(id), { currentSong, status })
  │
  ├── initRequest().getPut(RoomsUrl(id), ...) ← add/remove song
  ├── initRequest().getPut(RoomsUrl(id), ...) ← kick user
  ├── addOrRemoveUser(idUser, idRoom, 'REMOVE') ← leave room
  ├── cloneObj()                             ← safe array mutation
  ├── AutocompleteAsync                      ← search & add song
  ├── ListSongs                              ← room song list
  └── MenuItems                              ← context menu actions
```

### Music Player Sync Flow
```
MusicPlayerSlider
  ├── getRouteMatchPath() + isMatchRouters() ← show only on /rooms/:id
  ├── publish(LIST_EVENT.CURRENT_SONG, { status, objSong })
  │     └── RoomDetail.subscribe → getPut Firebase → broadcast all clients
  └── MyFavorites
        ├── initRequest().getOne(myFavoritesUrl(userId))
        ├── initRequest().getPost(myFavoritesUrl(), data)  ← add favorite
        └── initRequest().getDelete(myFavoritesUrl(id))   ← remove favorite
```

### Global UI Flow
```
ModalGlobal
  ├── subscribe(LIST_EVENT.MODAL_GLOBAL)     ← open modal
  ├── unsubscribe(LIST_EVENT.MODAL_GLOBAL)   ← cleanup
  └── Modal (context) → Header (layout)

CustomizedSnackbar
  ├── subscribe(LIST_EVENT.SNACKBAR)
  └── unsubscribe(LIST_EVENT.SNACKBAR)
```

---

## 🔑 Key Nodes & Responsibilities

| Node | File | Role |
|---|---|---|
| `httpRequest` | `src/service/httpRequest.ts` | Firebase CRUD wrapper — **never bypass** |
| `useStreaming` | `src/hook/useStreaming.ts` | Firebase `onValue` wrapper — realtime subscribe |
| `publish/subscribe/unsubscribe` | `src/service/event.ts` | Cross-component event bus |
| `LIST_EVENT` | `src/service/event.ts` | `CURRENT_SONG`, `SNACKBAR`, `MODAL_GLOBAL` |
| `addOrRemoveUser` | `src/utils/utils.ts` | Join/leave room — always use this, never mutate directly |
| `cloneObj` | `src/utils/utils.ts` | Deep clone before mutating Firebase arrays |
| `protectedLoader` | `src/routers/routers.ts` | Route guard — checks Redux `isLogin` |
| `initRequest` | `src/service/httpRequest.ts` | Returns singleton `httpRequest` instance |
| `triggerSong` | `src/store/SongSlice.ts` | Redux action — set current playing song |
| `loginUser` | `src/store/UserSlice.ts` | Redux action — set logged-in user |

---

## 🔗 URL Builders (`src/apis/request.ts`)

| Function | Output |
|---|---|
| `songUrl()` | `'songs'` |
| `songUrl(id)` | `'songs/{id}'` |
| `userUrl()` | `'users'` |
| `userUrl(id)` | `'users/{id}'` |
| `RoomsUrl()` | `'room'` |
| `RoomsUrl(id)` | `'room/{id}'` |
| `myFavoritesUrl()` | `'my_favorites'` |
| `myFavoritesUrl(id)` | `'my_favorites/{id}'` |

---

## 📡 Event Bus Events

| Event | Publisher | Subscriber | Payload |
|---|---|---|---|
| `LIST_EVENT.CURRENT_SONG` | `MusicPlayerSlider` | `RoomDetail` | `{ status: boolean, objSong }` |
| `LIST_EVENT.SNACKBAR` | `Login`, `CreateRoom`, `VerifyPassword`, `ChangePassword`, `ListRooms` | `CustomizedSnackbar` | `{ display, severity, message }` |
| `LIST_EVENT.MODAL_GLOBAL` | `Rooms`, `ListRooms`, `Login` | `ModalGlobal` | `{ Component, ComponentProps }` |

---

## 🏪 Redux Store

| Slice | State | Actions |
|---|---|---|
| `SongSlice` | `{ currentSong: songType }` | `triggerSong(songType)` |
| `UserSlice` | `{ isLogin: boolean, userInfo: IUserInfo }` | `loginUser(IUserInfo)` |

---

## ⚠️ Critical Rules (from graph analysis)

1. **`MyFavorites.tsx` imports `firebase/database` directly** — violation of project rule. Should use `httpRequest` instead.
2. **`useStreaming` useEffect has no deps** — intentional, mounted once only. Never add deps.
3. **`protectedLoader` reads Redux store directly** — `store.getState()[TYPE_REDUCER.USER].isLogin`.
4. **`window.callbackFn`** is set in `main.tsx` `callBack()` — bridges Firebase realtime → audio element.
5. **`cloneObj()` before any array push/filter** on Firebase data — Firebase returns frozen-like objects.

---

## 🧩 Component Dependency Map

```
App
├── ModalGlobal ──────────────── event: MODAL_GLOBAL
│     └── Modal → Header
├── CustomizedSnackbar ────────── event: SNACKBAR
└── RouterProvider
      ├── Login
      ├── Home → ListSongs
      │     └── StandardImageList (useStreaming)
      ├── Rooms (useStreaming)
      │     └── ListRooms → [CreateRoom | VerifyPassword] via MODAL_GLOBAL
      └── RoomDetail (useStreaming)
            ├── AutocompleteAsync
            ├── ListSongs
            ├── MenuItems
            ├── BadgeAvatars (UserActive)
            └── ChangePassword via MODAL_GLOBAL

Main (Layout)
  ├── MiniDrawer
  │     ├── SwitchTheme
  │     └── MusicPlayerSlider ── event: CURRENT_SONG → RoomDetail
  │           └── MyFavorites
  └── <Outlet /> (page content)
```
