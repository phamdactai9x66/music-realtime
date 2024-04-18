import { RouterProvider } from "react-router-dom";

import "./App.css";

import router from "src/routers/routers";
import { initRequest } from "./service/initRequest";
import { useStore } from "react-redux";
// import { store } from "./store/configureStore";

function App() {
  const store = useStore();

  initRequest(store);

  return <RouterProvider router={router} fallbackElement={<>loading...</>} />;
}

export default App;
