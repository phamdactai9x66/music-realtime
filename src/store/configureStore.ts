import { combineReducers, configureStore } from "@reduxjs/toolkit";

import songReducer from "./SongSlice";
import userReducer from "./UserSlice";

export const TYPE_REDUCER = {
  SONG: "APP/SONG",
  USER: "APP/USER",
};

export const store = configureStore({
  reducer: combineReducers({
    [TYPE_REDUCER.SONG]: songReducer,
    [TYPE_REDUCER.USER]: userReducer,
  }),
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
