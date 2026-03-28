# Project Structure

```
music-realtime/
├── public/                         # Static assets served directly
│   ├── 404.html
│   ├── index.html
│   └── vite.svg
│
├── src/
│   ├── apis/
│   │   └── request.ts              # Firebase URL builders (songUrl, userUrl, RoomsUrl, myFavoritesUrl)
│   │
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── _test_/                 # Component unit tests
│   │   ├── fields/
│   │   │   └── AutocompleteAsync.tsx   # Async autocomplete input (search & select songs)
│   │   └── ui/
│   │       ├── FormCreateRoom/
│   │       │   ├── FormCreateRoom.tsx  # Form tạo phòng (name, optional password)
│   │       │   └── index.ts
│   │       ├── FormVertifyPassword/
│   │       │   ├── FormVerifyPassword.tsx  # Form xác thực password phòng
│   │       │   └── index.ts
│   │       ├── MusicPlayerSlider/
│   │       │   ├── Components/
│   │       │   │   └── MyFavorites.tsx     # Nút thêm/xóa bài hát yêu thích
│   │       │   ├── MusicPlayerSlider.tsx   # Global music player (fixed bottom)
│   │       │   └── index.ts
│   │       ├── ListItems.tsx           # Danh sách bài hát (dùng ở Home & RoomDetail)
│   │       ├── MenuItem.tsx            # Dropdown menu (Back, Change Password,...)
│   │       ├── ModalGlobal.tsx         # Global modal, nhận Component qua event bus
│   │       ├── SnackbarProvider.tsx    # Global snackbar, trigger qua event bus
│   │       └── SwitchTheme.tsx         # Toggle dark/light theme
│   │
│   ├── context/
│   │   └── Modal.tsx               # React context cho modal (dự phòng)
│   │
│   ├── data/
│   │   └── constants.ts            # Các hằng số dùng chung
│   │
│   ├── features/                   # Các trang chính (feature-based)
│   │   ├── Home/
│   │   │   ├── Components/
│   │   │   │   └── SlideImage.tsx  # Banner slide ảnh
│   │   │   ├── Home.tsx            # Trang chủ: danh sách & tìm kiếm bài hát
│   │   │   └── index.ts
│   │   ├── Login/
│   │   │   ├── Login.tsx           # Đăng nhập bằng Google OAuth
│   │   │   └── index.ts
│   │   ├── RoomDetail/
│   │   │   ├── Components/
│   │   │   │   ├── ChangePassword.tsx  # Form đổi password phòng (chỉ owner)
│   │   │   │   └── UserActive.tsx      # Hiển thị avatar user trong phòng, kick user
│   │   │   ├── RoomDetail.tsx      # Chi tiết phòng: realtime sync nhạc, quản lý user/song
│   │   │   └── index.ts
│   │   ├── Rooms/
│   │   │   ├── Components/
│   │   │   │   └── ListRooms.tsx   # Danh sách phòng
│   │   │   ├── Rooms.tsx           # Trang danh sách phòng: tìm kiếm, tạo phòng
│   │   │   └── index.ts
│   │   └── features.test.ts
│   │
│   ├── hook/
│   │   ├── hooks.test.ts
│   │   ├── index.ts
│   │   ├── useRoomMutation.ts      # Hook fetch & search danh sách phòng
│   │   └── useStreaming.ts         # Hook subscribe Firebase onValue (realtime)
│   │
│   ├── layouts/
│   │   ├── Header.tsx
│   │   ├── Main.tsx                # Layout chính: sidebar, topbar, MusicPlayerSlider
│   │   └── index.ts
│   │
│   ├── models/
│   │   └── Room.model.ts           # Interface Room (roomsIf)
│   │
│   ├── pages/                      # Re-export các feature pages
│   │   ├── index.ts
│   │   ├── Login.ts
│   │   └── Rooms.ts
│   │
│   ├── routers/
│   │   └── routers.ts              # Định nghĩa routes, protectedLoader, PATH_ROUTER
│   │
│   ├── service/
│   │   ├── event.ts                # Custom event bus (publish/subscribe/unsubscribe)
│   │   ├── firebase.ts             # Khởi tạo Firebase app, analytics, database
│   │   ├── httpRequest.ts          # Firebase CRUD wrapper (getData, getOne, getPost, getPut, getDelete)
│   │   ├── WebWorker.ts            # Helper khởi tạo Web Worker
│   │   └── worker.ts               # Web Worker script
│   │
│   ├── store/
│   │   ├── configureStore.ts       # Redux store setup (combineReducers)
│   │   ├── SongSlice.ts            # State bài hát đang phát (triggerSong)
│   │   └── UserSlice.ts            # State user đăng nhập (loginUser)
│   │
│   ├── theme/
│   │   ├── dark.ts                 # MUI dark theme config
│   │   ├── light.ts                # MUI light theme config
│   │   └── themeRoot.ts            # Hook useThemeRoot (toggle dark/light)
│   │
│   ├── types-global/
│   │   └── index.d.ts              # Global TypeScript types (looseObj,...)
│   │
│   ├── utils/
│   │   ├── index.ts
│   │   └── utils.ts                # Helpers: cloneObj, addOrRemoveUser, getRouteMatchPath,...
│   │
│   ├── App.css
│   ├── App.tsx                     # Root component: ThemeProvider, RouterProvider, ModalGlobal, SnackbarProvider
│   ├── index.css
│   ├── main.tsx                    # Entry point
│   └── vite-env.d.ts
│
├── .env                            # Biến môi trường mặc định
├── .env.development                # Biến môi trường development
├── .env.local                      # Biến môi trường local (gitignored)
├── .env.production                 # Biến môi trường production
├── .env.uat                        # Biến môi trường UAT
├── .eslintrc.cjs                   # ESLint config
├── .firebaserc                     # Firebase project alias
├── build-dev.sh                    # Script build môi trường dev
├── build-production.sh             # Script build môi trường production
├── firebase.json                   # Firebase hosting config
├── index.html                      # HTML entry point
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts                  # Vite config
```
