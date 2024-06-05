import * as React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Stack from "@mui/material/Stack";

import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { UserType, loginUser } from "src/store/UserSlice";
import { useNavigate } from "react-router-dom";
import { PATH_ROUTER } from "src/routers/routers";
import httpRequest from "src/service/httpRequest";
import { userUrl } from "src/apis/request";

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
        const userResponse = (isNoLogged ? userinfo : dataResponse) as UserType;

        dispatch(loginUser(userResponse));

        navigate(PATH_ROUTER.ROOT);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const onLoginFaceBook = () => {
    const provider = new FacebookAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  return (
    <div className={classes.containerBox}>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        {/* <Button
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={onLoginFaceBook}
        >
          Facebook
        </Button> */}
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
