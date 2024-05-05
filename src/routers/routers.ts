import { createBrowserRouter } from "react-router-dom";
import Home from "src/features/Home/Home";
import Login from "src/features/Login";
import Rooms from "src/features/Rooms";
import RoomDetail from "src/features/RoomDetail";

import { Main } from "src/layouts";

export const PATH_ROUTER: looseObj = {
  ROOT: "/",
  LOGIN: "/login",
  ROOMS: "/rooms",
  ROOM_DETAIL: "/rooms/:idRoom",
};

export const NAB_ROUTER = {
  ROOT: "/",
  LOGIN: "/login",
  ROOMS: "/rooms",
};

export const LABEL_PATH = {
  [PATH_ROUTER.ROOT]: "Home",
  [PATH_ROUTER.LOGIN]: "Login",
  [PATH_ROUTER.ROOMS]: "Rooms",
  [PATH_ROUTER.ROOM_DETAIL]: "Room Detail",
};

export const DISPLAY_AUDIO: looseObj = {
  [PATH_ROUTER.ROOT]: true,
  [PATH_ROUTER.ROOM_DETAIL]: true,
};

const router = createBrowserRouter([
  {
    id: "root",
    path: PATH_ROUTER.ROOT,
    loader() {
      // Our root route always provides the user, if logged in

      return {};
    },
    Component: Main,
    children: [
      {
        index: true,
        Component: Home,
        // loader: protectedLoader,
      },
      {
        Component: Login,
        path: PATH_ROUTER.LOGIN,
      },
      {
        Component: Rooms,
        path: PATH_ROUTER.ROOMS,
      },
      {
        Component: RoomDetail,
        path: PATH_ROUTER.ROOM_DETAIL,
      },
    ],
  },
]);

export default router;
