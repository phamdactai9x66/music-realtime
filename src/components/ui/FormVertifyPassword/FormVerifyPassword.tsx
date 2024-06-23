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

const initialValues = {
  password: "",
};

const VerifyPassword: React.FC<Props> = (props) => {
  const { callBack, idRoom } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

        const dataRes = await httpRequest.getOne(RoomsUrl(idRoom));

        if (dataRes.password == values.password) {
          publish(LIST_EVENT.MODAL_GLOBAL, {
            Component: null,
            ComponentProps: {},
          });

          return callBack?.();
        }

        throw Error("Your password is incorrect");
      } catch (error: Error | any) {
        // feedback alert for user after create room success
        publish(LIST_EVENT.SNACKBAR, {
          display: true,
          severity: "error",
          message: error.message || "Your password is incorrect",
        });
      }
    },
  });

  const {
    values,
    handleChange,
    setFieldValue,
    handleBlur,
    touched,
    errors,
    handleSubmit,
  } = formik;

  return (
    <React.Fragment>
      <Typography
        id="keep-mounted-modal-title"
        sx={{ paddingBottom: 2 }}
        variant="h5"
        component="h2"
      >
        Verify Password
      </Typography>

      <form action="" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={!showPassword ? "password" : "text"}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
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
  password: yup.string().required("Password is required"),
});

export default VerifyPassword;
