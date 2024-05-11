import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Stack from "@mui/material/Stack";

import { Button, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

type LoginProps = object & React.PropsWithChildren;

const useStyle = makeStyles((theme: Theme) => {
  return {
    containerBox: {},
  };
});

const Login: React.FC<LoginProps> = () => {
  const classes = useStyle();

  return (
    <div className={classes.containerBox}>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Button variant="outlined" startIcon={<FacebookIcon />}>
          Facebook
        </Button>
        <Button variant="outlined" startIcon={<GoogleIcon />}>
          Google Gmail
        </Button>
      </Stack>
    </div>
  );
};

export default Login;
