import { createTheme } from "@mui/material";
import React from "react";
import Dark from "./dark";
import Light from "./light";

const useThemeRoot = () => {
  const [Mode] = React.useState("");

  const theme = React.useMemo(() => createTheme(Mode ? Light : Dark), [Mode]);

  return theme;
};

export default useThemeRoot;
