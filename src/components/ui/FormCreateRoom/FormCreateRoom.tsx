import { Button, TextField, Typography } from "@mui/material";
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

const CreateRoom: React.FC<Props> = (props) => {
  const { callBack } = props;

  const formik = useFormik({
    initialValues: {
      name_room: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formValue = {
          ...values,
          users: [],
          songs: [],
        };

        await httpRequest.getPost(RoomsUrl(), formValue);

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

      <form action="" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Name Room"
          id="name_room"
          name="name_room"
          placeholder="Enter room name"
          value={formik.values.name_room}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name_room && Boolean(formik.errors.name_room)}
          helperText={formik.touched.name_room && formik.errors.name_room}
          sx={{ marginBottom: 2 }}
        />

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
});

export default CreateRoom;
