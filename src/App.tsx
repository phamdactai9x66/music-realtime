import { RouterProvider } from "react-router-dom";

import "./App.css";

import router from "src/routers/routers";
import { initRequest } from "./service/httpRequest.ts";
import { useStore } from "react-redux";
import { ThemeProvider } from "@mui/styles";
import useThemeRoot from "./theme/themeRoot.ts";
import { CssBaseline } from "@mui/material";

// import { store } from "./store/configureStore";

function App() {
  const theme = useThemeRoot();

  const store = useStore();

  initRequest(store);

  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />
      <RouterProvider router={router} fallbackElement={<>loading...</>} />
    </ThemeProvider>
  );
}

export default App;
