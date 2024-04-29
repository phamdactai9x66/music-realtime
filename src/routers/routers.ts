import {
  LoaderFunctionArgs,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Home from "src/features/Home/Home";
import Login from "src/features/Login";
import { Main } from "src/layouts";

export const PATH_ROUTER = {
  ROOT: "/",
  LOGIN: "/login",
};

export const LABEL_PATH = {
  [PATH_ROUTER.ROOT]: "Home",
  [PATH_ROUTER.LOGIN]: "Login",
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
