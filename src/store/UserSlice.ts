import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserType = {
  isLogin: boolean;
};

const initialState: UserType = {
  isLogin: false,
};

export const counterSlice = createSlice({
  name: "APP/COUNTER",
  initialState,
  reducers: {
    triggerUser: (state, payload: PayloadAction<UserType>) => {
      if (!payload.payload) return;

      return payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { triggerUser } = counterSlice.actions;

export default counterSlice.reducer;
