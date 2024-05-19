import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./service/firebase.ts";
// import { initRequest } from "./service/initRequest.ts";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { CssBaseline } from "@mui/material";

const callBack = () => {
  return ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  );
};

callBack();
