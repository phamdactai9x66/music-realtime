import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./SongSlice";

export const TYPE_REDUCER = {
  SONG: "APP/SONG",
};

export const store = configureStore({
  reducer: {
    [TYPE_REDUCER.SONG]: counterReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
