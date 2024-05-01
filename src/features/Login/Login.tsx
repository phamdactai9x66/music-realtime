import { Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

type LoginProps = object & React.PropsWithChildren;

const useStyle = makeStyles((theme: Theme) => {
  console.log(theme);
  return {
    containerBox: {},
  };
});

const Login: React.FC<LoginProps> = () => {
  const classes = useStyle();

  return (
    <div className={classes.containerBox}>
      <Button>Login</Button>
    </div>
  );
};

export default Login;
