import { Box, Modal } from "@mui/material";
import React from "react";

import { LIST_EVENT, subscribe, unsubscribe } from "src/service/event";

type Props = object & React.PropsWithChildren;

type TComponent = {
  display: boolean;
  Component: any;
  ComponentProps: {};
};

const ModalGlobal: React.FC<Props> = (props: Props) => {
  const [modal, setModal] = React.useState<TComponent>({
    display: false,
    Component: undefined,
    ComponentProps: {},
  });

  const { display, Component, ComponentProps } = modal;

  const cb = (data: looseObj) => {
    setModal((pre) => {
      // data props
      const { detail } = data;

      return { ...pre, ...detail, display: !pre.display };
    });
  };

  /**
   * add event action modal change
   */

  React.useEffect(() => {
    subscribe(LIST_EVENT.MODAL_GLOBAL, cb);

    return () => {
      unsubscribe(LIST_EVENT.MODAL_GLOBAL, cb);
    };
  }, []);

  const handleClose = () => {
    const body = {
      detail: {
        Component: undefined,
        ComponentProps: {},
      },
    };

    cb(body);
  };

  return (
    <React.Fragment>
      <Modal
        keepMounted
        open={display}
        onClose={handleClose}
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
          {Component ? <Component {...ComponentProps} /> : null}
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ModalGlobal;
