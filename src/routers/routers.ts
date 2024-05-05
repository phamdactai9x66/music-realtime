import {
  LoaderFunctionArgs,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Home from "src/features/Home/Home";
import Login from "src/features/Login";
import Rooms from "src/features/Rooms";
import RoomDetail from "src/features/RoomDetail";

import { Main } from "src/layouts";

export const PATH_ROUTER = {
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

export const DISPLAY_AUDIO = {
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

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const params = new URLSearchParams();

  params.set("from", new URL(request.url).pathname);

  return redirect("/login?" + params.toString());
}

export default router;
