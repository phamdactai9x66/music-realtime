import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type IUserInfo =
  | {
      name?: string;
      picture?: string;
      id?: string;
    } & looseObj;

export type UserType = {
  isLogin: boolean;
  userInfo: IUserInfo;
};

// fake user
// const initialState: UserType = {
//   isLogin: true,
//   userInfo: {
//     email: "tai15122003311@gmail.com",
//     family_name: "pham",
//     given_name: "tai",
//     granted_scopes:
//       "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
//     id: "113294946135490343075",
//     name: "tai pham",
//     picture:
//       "https://lh3.googleusercontent.com/a/ACg8ocKAqfYjSOH_t-RROQcYEriZi2BmYqPe_S6g7vx-utu8DJPVuw=s96-c",
//     verified_email: true,
//   },
// };

const initialState: UserType = {
  isLogin: false,
  userInfo: {},
};

export const counterSlice = createSlice({
  name: "APP/COUNTER",
  initialState,
  reducers: {
    loginUser: (state, actions: PayloadAction<IUserInfo>) => {
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
