import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { RoomsUrl } from "src/apis/request";
import { LIST_EVENT, publish } from "src/service/event";
import httpRequest from "src/service/httpRequest";

import * as yup from "yup";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  callBack: () => void;
} & looseObj &
  React.PropsWithChildren;

enum TYPE_FIELD {
  verify_password = "verify_password",
  new_password = "new_password",
}

const initialValues = {
  verify_password: "",
  new_password: "",
};

const ChangePassword: React.FC<Props> = (props) => {
  const { callBack, idRoom } = props;

  const [showType, setShowType] = React.useState({
    verify_password: false,
    new_password: false,
  });

  const handleClickShowPassword = (key: TYPE_FIELD) => () =>
    setShowType((fields) => {
      return {
        ...fields,
        [key]: !fields[key],
      };
    });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (!idRoom) throw Error("id not found");

        // get data of current room
        const dataRes = await httpRequest.getOne(RoomsUrl(idRoom));

        if (dataRes.password == values.verify_password) {
          // change password
          await httpRequest.getPut(RoomsUrl(idRoom), {
            password: values.new_password,
          });

          publish(LIST_EVENT.SNACKBAR, {
            display: true,
            severity: "success",
            message: "Your password has been changed successfully",
          });

          return callBack?.();
        }

        throw Error("Your password is incorrect");
      } catch (error: Error | any) {
        publish(LIST_EVENT.SNACKBAR, {
          display: true,
          severity: "error",
          message: error.message || "Your password is incorrect",
        });
      }
    },
  });

  const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
    formik;

  return (
    <React.Fragment>
      <Typography
        id="keep-mounted-modal-title"
        sx={{ paddingBottom: 2 }}
        variant="h5"
        component="h2"
      >
        Change Password
      </Typography>

      <form action="" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Verify Password"
          name="verify_password"
          type={!showType["verify_password"] ? "password" : "text"}
          value={values.verify_password}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword(TYPE_FIELD.verify_password)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showType["verify_password"] ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={touched.verify_password && Boolean(errors.verify_password)}
          helperText={touched.verify_password && errors.verify_password}
        />
        <Box sx={{ marginBottom: 2 }}></Box>
        <TextField
          fullWidth
          label="New Password"
          name="new_password"
          type={!showType["new_password"] ? "password" : "text"}
          value={values.new_password}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword(TYPE_FIELD.new_password)}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showType["new_password"] ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={touched.new_password && Boolean(errors.new_password)}
          helperText={touched.new_password && errors.new_password}
        />

        <Box sx={{ marginBottom: 2 }}></Box>

        <Button
          color="primary"
          sx={{
            ":focus": {
              outline: "none !important",
            },
          }}
          type="submit"
          variant="contained"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};

const validationSchema = yup.object({
  verify_password: yup.string().required("Verify password is required"),
  new_password: yup.string().required("New password is required"),
});

export default ChangePassword;
