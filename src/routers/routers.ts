import { createBrowserRouter } from "react-router-dom";
import Login from "src/features/Login";
import { Main } from "src/layouts";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return {};
    },
    Component: Main,
    children: [
      {
        index: true,
        Component: Login,
      },
    ],
  },
]);

export default router;
