import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./service/firebase.ts";
// import { initRequest } from "./service/initRequest.ts";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";

const callBack = () => {
  return ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

callBack();
