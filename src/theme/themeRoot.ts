import { createTheme } from "@mui/material";
import React from "react";
import Dark from "./dark";
import Light from "./light";

const useThemeRoot = () => {
  const [Mode] = React.useState(true);

  const theme = () => createTheme(Mode ? Light : Dark);

  return theme;
};

export default useThemeRoot;
