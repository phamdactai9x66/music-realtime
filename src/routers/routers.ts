import {
  LoaderFunctionArgs,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Home from "src/features/Home/Home";
import Login from "src/features/Login";
import Rooms from "src/features/Rooms";
import RoomDetail from "src/features/RoomDetail";
import { TYPE_REDUCER, store } from "src/store/configureStore";

import { Main } from "src/layouts";
import { UserType } from "src/store/UserSlice";

export const PATH_ROUTER: looseObj = {
  ROOT: "/",
  LOGIN: "/login",
  ROOMS: "/rooms",
  ROOM_DETAIL: "/rooms/:idRoom",
};

export const NAB_ROUTER_PUBLIC = [PATH_ROUTER.ROOT, PATH_ROUTER.LOGIN];

export const NAB_ROUTER_PRIVATE = [PATH_ROUTER.ROOT, PATH_ROUTER.ROOMS];

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
      },
      {
        Component: Login,
        path: PATH_ROUTER.LOGIN,
      },
      {
        Component: Rooms,
        path: PATH_ROUTER.ROOMS,
        loader: protectedLoader,
      },
      {
        Component: RoomDetail,
        path: PATH_ROUTER.ROOM_DETAIL,
        loader: protectedLoader,
      },
    ],
  },
]);

// this force navigate to login when user no logged success yed

function protectedLoader({ request }: LoaderFunctionArgs) {
  const state = store.getState()[TYPE_REDUCER.USER] as UserType;

  if (!state.isLogin) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

export default router;
