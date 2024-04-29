import { Button } from "@mui/material";
import React from "react";

type LoginProps = object & React.PropsWithChildren;

const Login: React.FC<LoginProps> = () => {
  return (
    <div>
      <Button>Login</Button>
    </div>
  );
};

export default Login;
