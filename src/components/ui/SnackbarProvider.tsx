import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { subscribe, LIST_EVENT, unsubscribe } from "src/service/event";

type snackbarControllerType = {
  display: boolean;
  severity: "success" | "info" | "warning" | "error";
  message: string;
};

export default function CustomizedSnackbar() {
  // control system snackbar
  const [snackbarController, setSnackbarController] =
    React.useState<snackbarControllerType>({
      display: false,
      severity: "info",
      message: "",
    });

  // subscribe event snackbar change
  React.useEffect(() => {
    const handleSnackbar = (data: looseObj) => {
      const { detail } = data || {};

      setSnackbarController((pre) => {
        return {
          ...pre,
          ...detail,
        };
      });
    };

    subscribe(LIST_EVENT.SNACKBAR, handleSnackbar);

    return () => {
      unsubscribe(LIST_EVENT.SNACKBAR, handleSnackbar);
    };
  }, []);

  /**
   * this function control when snackbar should no display
   * @param event
   * @param reason
   * @returns
   */
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setSnackbarController((pre) => ({
      ...pre,
      display: false,
    }));
  };

  return (
    <div>
      <Snackbar
        open={snackbarController.display}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarController.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarController.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
