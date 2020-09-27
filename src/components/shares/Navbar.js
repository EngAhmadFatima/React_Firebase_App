import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar } from "@material-ui/core";
import NavMenuButton from "./NavMenuButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined";
import { UserContext } from "../../Services/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Tajawal",
  },
}));

function Navbar() {
  const currentUser = useContext(UserContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar
        dir="rtl"
        position="fixed"
        style={{ backgroundColor: "#8E2437", opacity: "90%" }}
      >
        <Toolbar style={{ paddingRight: "0px", paddingLeft: "5px" }}>
          <NavMenuButton className={classes.menuButton} />
          <Typography color="initial" className={classes.title} variant="h5">
            لابِكس
          </Typography>
          {currentUser ? (
            <FaceOutlinedIcon color="inherit" fontSize="large" />
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
