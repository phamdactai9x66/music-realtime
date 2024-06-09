import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { subscribe, LIST_EVENT, unsubscribe } from "src/service/event";

export default function CustomizedSnackbar() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleSnackbar = (data: looseObj) => {
      const {
        detail: { display },
      } = data;

      setOpen(display);
    };

    subscribe(LIST_EVENT.SNACKBAR, handleSnackbar);

    return () => {
      unsubscribe(LIST_EVENT.SNACKBAR, handleSnackbar);
    };
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
}
