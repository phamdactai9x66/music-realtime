import { RouterProvider } from "react-router-dom";

import "./App.css";

import router from "src/routers/routers";
import { initRequest } from "src/service/httpRequest";
import { Experimental_CssVarsProvider, ThemeProvider } from "@mui/material";
import useThemeRoot from "src/theme/themeRoot";
import { CssBaseline } from "@mui/material";
import SnackbarProvider from "./components/ui/SnackbarProvider";
import ModalGlobal from "./components/ui/ModalGlobal";

// import { store } from "./store/configureStore";

function App() {
  const theme = useThemeRoot();

  initRequest();

  return (
    <ThemeProvider theme={theme()}>
      <Experimental_CssVarsProvider>
        <SnackbarProvider />
        <CssBaseline />
        <ModalGlobal />
        <RouterProvider router={router} fallbackElement={<>loading...</>} />
      </Experimental_CssVarsProvider>
    </ThemeProvider>
  );
}

export default App;
