import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";

export const TYPE_REDUCER = {
  COUNTER: "APP/COUNTER",
};

export const store = configureStore({
  reducer: {
    [TYPE_REDUCER.COUNTER]: counterReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;