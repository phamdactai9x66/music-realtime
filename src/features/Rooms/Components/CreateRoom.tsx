import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { RoomsUrl } from "src/apis/request";
import httpRequest from "src/service/httpRequest";
import { RootState, TYPE_REDUCER } from "src/store/configureStore";
import { UserType } from "src/store/UserSlice";
import * as yup from "yup";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  callBack: () => void;
} & React.PropsWithChildren;

const validationSchema = yup.object({
  name_room: yup.string().required("Name Room is required"),
});

const CreateRoom: React.FC<Props> = (props: Props) => {
  const { open, setOpen } = props;

  const user = useSelector(
    (state: RootState) => state[TYPE_REDUCER.USER] as UserType
  );

  const formik = useFormik({
    initialValues: {
      name_room: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const key = user.userInfo?.id as string;

        const formValue = {
          ...values,
          users: [key],
          songs: [],
        };

        await httpRequest.getPost(RoomsUrl(), formValue);

        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <React.Fragment>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
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
              error={
                formik.touched.name_room && Boolean(formik.errors.name_room)
              }
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
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default CreateRoom;
