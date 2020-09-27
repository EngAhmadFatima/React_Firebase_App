import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
//import { Slide } from "@material-ui/core";

function SnackbarMessage({ open, close, type, message }) {
  return (
    <React.Fragment>
      <Snackbar
        open={open}
        onClose={close}
        autoHideDuration={3000}
        // anchorOrigin={{ vertical, horizontal }}
      >
        <MuiAlert
          style={{ textAlign: "center" }}
          elevation={6}
          variant="filled"
          //onClose={close}
          severity={type}
        >
          <span style={{ fontFamily: "tajawal" }}>{message}</span>
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  );
}

export default SnackbarMessage;
