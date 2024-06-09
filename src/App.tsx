import { RouterProvider } from "react-router-dom";

import "./App.css";

import router from "src/routers/routers";
import { initRequest } from "src/service/httpRequest";
import { useStore } from "react-redux";
import { ThemeProvider } from "@mui/styles";
import useThemeRoot from "src/theme/themeRoot";
import { CssBaseline } from "@mui/material";
import SnackbarProvider from "./components/ui/SnackbarProvider";

// import { store } from "./store/configureStore";

function App() {
  const theme = useThemeRoot();

  const store = useStore();

  initRequest(store);

  return (
    <ThemeProvider theme={theme()}>
      <SnackbarProvider />
      <CssBaseline />
      <RouterProvider router={router} fallbackElement={<>loading...</>} />
    </ThemeProvider>
  );
}

export default App;
