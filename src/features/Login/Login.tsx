import * as React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Stack from "@mui/material/Stack";

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { IUserInfo, loginUser } from "src/store/UserSlice";
import { useNavigate } from "react-router-dom";
import { PATH_ROUTER } from "src/routers/routers";
import httpRequest from "src/service/httpRequest";
import { userUrl } from "src/apis/request";
import { LIST_EVENT, publish } from "src/service/event";

type LoginProps = object & React.PropsWithChildren;

const useStyle = makeStyles(() => {
  return {
    containerBox: {},
  };
});

const Login: React.FC<LoginProps> = () => {
  const classes = useStyle();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginGoogle = () => {
    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // The signed-in user info.
        const userDetail = getAdditionalUserInfo(result);

        const userinfo: looseObj = userDetail?.profile || {};

        const dataResponse = await httpRequest.getOne(userUrl(userinfo.id));

        const isNoLogged = Object.values(dataResponse).length;

        // if user don't have info in db, Fe call API to create them
        if (!isNoLogged) {
          await httpRequest.getPost(userUrl(userinfo.id), userinfo, false);
        }

        // if user is new User user data Default, if logged user data detail
        const userResponse = (
          isNoLogged ? userinfo : dataResponse
        ) as IUserInfo;

        // save info user in to redux
        dispatch(loginUser(userResponse));

        // message Welcome user login project
        const messageAlert = `Welcome ${
          userResponse?.name?.toUpperCase() || "--"
        } to Web Music!!`;

        // feedback alert for user after login success
        publish(LIST_EVENT.SNACKBAR, {
          display: true,
          severity: "success",
          message: messageAlert,
        });

        // navigate to home screen
        navigate(PATH_ROUTER.ROOT);
      })
      .catch((error) => {
        const errorMessage = error.message;

        // feedback alert for user after login unsuccess
        publish(LIST_EVENT.SNACKBAR, {
          display: true,
          severity: "error",
          message: errorMessage,
        });
      });
  };

  return (
    <div className={classes.containerBox}>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={onLoginGoogle}
        >
          Google Gmail
        </Button>
      </Stack>
    </div>
  );
};

export default Login;
