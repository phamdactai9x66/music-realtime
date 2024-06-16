import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  TextField,
  Typography,
  Checkbox as CheckBox,
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
} & React.PropsWithChildren;

const initialValues = {
  name_room: "",
  allowPassword: false,
  password: "",
};

const CreateRoom: React.FC<Props> = (props) => {
  const { callBack } = props;

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
        await httpRequest.getPost(RoomsUrl(), values);

        // feedback alert for user after create room success
        publish(LIST_EVENT.SNACKBAR, {
          display: true,
          severity: "success",
          message: "Create Room Successfully",
        });

        callBack?.();
      } catch (error) {
        // feedback alert for user after create room success
        publish(LIST_EVENT.SNACKBAR, {
          display: true,
          severity: "error",
          message: "Create Room Unsuccessfully",
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
        Create Room
      </Typography>

      <form action="" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name Room"
          name="name_room"
          value={values.name_room}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name_room && Boolean(errors.name_room)}
          helperText={touched.name_room && errors.name_room}
        />

        <FormControlLabel
          control={
            <CheckBox
              checked={values.allowPassword}
              name="allowPassword"
              onChange={(event, checked) => {
                setFieldValue("allowPassword", checked);
              }}
            />
          }
          label="allow password"
        />

        {/* only show when allow password is enable */}
        {values.allowPassword && (
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
        )}

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
  name_room: yup.string().required("Name Room is required"),
  password: yup.string().when("allowPassword", ([allowPassword], schema) => {
    return allowPassword ? schema.required("Password is required") : schema;
  }),
});

export default CreateRoom;
