import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserType = {
  isLogin: boolean;
  userInfo:
    | {
        name?: string;
        picture?: string;
        id?: string;
      }
    | looseObj;
};

const initialState: UserType = {
  isLogin: false,
  userInfo: {},
};

export const counterSlice = createSlice({
  name: "APP/COUNTER",
  initialState,
  reducers: {
    loginUser: (state, actions: PayloadAction<UserType>) => {
      const { payload } = actions;

      if (!payload) return;

      return {
        isLogin: true,
        userInfo: payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser } = counterSlice.actions;

export default counterSlice.reducer;
