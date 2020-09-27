import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Drawer,
  List,
  Divider,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { UserContext } from "../../Services/UserContext";
import { GlobalContext } from "../../Services/GlobalState";
import Firebase from "../../Services/firebase";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SnackbarMessage from "../shares/SnackbarMessage";

const useStyles = makeStyles({
  list: {
    width: 250,
    fontFamily: "Tajawal",
    opacity: "90%",
  },
  fullList: {},
  icon: {
    marginLeft: 0,
    marginRight: 0,
  },
  itemText: {
    fontSize: "20px",
    color: "gray",
  },
});

function NavMenuButton({ history }) {
  const currentUser = useContext(UserContext);
  const globalState = useContext(GlobalContext);
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "تمت بنجاح",
    type: "success",
  });
  const [_outUSD, set_outUSD] = useState(0);

  function handleCloseSnackbar() {
    setSnackbar({ ...snackbar, open: false });
  }
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };
  const handelLogout = (open) => (event) => {
    setOpenDrawer(false);
    Firebase.logOut();
  };
  async function GetUSDtoSYR() {
    // setUsdLoading(true);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://sp-today.com/ticker-news/cur.json"; // site that doesn’t send Access-Control-*
    const res = await fetch(proxyurl + url); // https://cors-anywhere.herokuapp.com/https://example.com
    res
      .json()
      .then((res) => set_outUSD(res[0].buy_price))
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
    //  setUsdLoading(false);
  }
  const UpdateUSD = () => {
    const [_usd, set_usd] = useState(globalState.usd);
    const [_openUsdDialog, set_openUsdDialog] = useState(false);

    function submitUSD() {
      Firebase.UPDATE_GLOBAL_VALUES({ usd: _usd })
        .then(() => {
          setSnackbar({
            open: true,
            type: "success",
            message: "تم التعديل بنجاح",
          });
          // console.log("Customer Saved", _item);
        })
        .catch((error) => {
          setSnackbar({
            open: true,
            type: "error",
            message: "لم يتم التعديل",
          });
          // console.log("Customer not Saved", _item);
        });
    }

    return (
      <div>
        <SnackbarMessage
          open={snackbar.open}
          close={handleCloseSnackbar}
          type={snackbar.type}
          message={snackbar.message}
        />
        <ListItem
          onClick={() => set_openUsdDialog(true)}
          button
          key={"my usd"}
          // component={Link}
          // to="/invoices"
        >
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <span className={classes.itemText}>{globalState.usd}</span>
        </ListItem>

        <Dialog open={_openUsdDialog}>
          <DialogContent>
            <h3>Update USD</h3>
            <TextField
              value={_usd}
              label="usd"
              type="number"
              onChange={(e) => set_usd(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <IconButton onClick={submitUSD}>ok</IconButton>
            <IconButton onClick={() => set_openUsdDialog(false)}>
              cancel
            </IconButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  const MenuItemsList = () => {
    return (
      <React.Fragment>
        <Button className={classes.icon} onClick={toggleDrawer(false)}>
          <ChevronRight
            color="inherit"
            fontSize="small"
            style={{ padding: "15" }}
          />
        </Button>
        <Divider />
        <List dir="rtl" className={classes.list}>
          <ListItem
            onClick={toggleDrawer(false)}
            key={"Home"}
            component={Link}
            to="/"
          >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <span className={classes.itemText}>الرئيسية</span>
          </ListItem>
          <ListItem
            onClick={toggleDrawer(false)}
            button
            key={"About"}
            component={Link}
            to="/about"
          >
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <span className={classes.itemText}>من نحن</span>
          </ListItem>
          <ListItem
            onClick={toggleDrawer(false)}
            button
            key={"jobs"}
            component={Link}
            to="/jobs"
          >
            <ListItemIcon>
              <WorkOutlineIcon />
            </ListItemIcon>
            <span className={classes.itemText}>فرص العمل</span>
          </ListItem>
          <Divider />
          <br />
          {!currentUser ? (
            <ListItem
              onClick={toggleDrawer(false)}
              button
              key={"login"}
              component={Link}
              to="/login"
            >
              <ListItemIcon>
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <span className={classes.itemText}>تسجيل الدخول</span>
            </ListItem>
          ) : (
            <>
              <ListItem
                onClick={handelLogout(false)}
                button
                key={"logout"}
                component={Link}
                to="/"
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <span className={classes.itemText}>تسجيل الخروج</span>
              </ListItem>
              <br />
              <Divider />

              <ListItem
                onClick={toggleDrawer(false)}
                button
                key={"dashboard"}
                component={Link}
                to="/dashboard"
              >
                <ListItemIcon>
                  <DashboardOutlinedIcon />
                </ListItemIcon>
                <span className={classes.itemText}>لوحة التحكم</span>
              </ListItem>
              <ListItem
                onClick={toggleDrawer(false)}
                button
                key={"invoices"}
                component={Link}
                to="/invoices"
              >
                <ListItemIcon>
                  <ListAltOutlinedIcon />
                </ListItemIcon>
                <span className={classes.itemText}>الفواتير</span>
              </ListItem>
              <UpdateUSD />
              <ListItem
                onClick={toggleDrawer(false)}
                //  button
                key={"out usd"}
                // component={Link}
                // to="/invoices"
              >
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <span className={classes.itemText}>{_outUSD}</span>
              </ListItem>
            </>
          )}
        </List>
        <Divider />
      </React.Fragment>
    );
  };

  useEffect(() => {
    GetUSDtoSYR();
  }, []);

  return (
    <React.Fragment>
      <Button color="inherit" onClick={toggleDrawer(true)}>
        <MenuIcon color="inherit" fontSize="large" />
      </Button>
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        <MenuItemsList />
      </Drawer>
    </React.Fragment>
  );
}

export default NavMenuButton;
