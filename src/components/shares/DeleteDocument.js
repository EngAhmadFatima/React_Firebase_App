import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DeleteOutline } from "@material-ui/icons";
import Firebase from "../../Services/firebase";
import SnackbarMessage from "../shares/SnackbarMessage";

export default function AlertDialog({ collection, item, open, close }) {
  //#region States
  //const [_open, set_Open] = React.useState(open);
  // const [loadingCash, setLoadingCash] = useState(true);
  //  const [cashValue, setCashValue] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "تمت بنجاح",
    type: "success",
  });
  //#endregion
  //-----------------------------
  //#region Functions

  function handleDelete() {
    switch (collection) {
      case "INVOICES":
        console.log("Updating STOCK_ITEMS:");
        item.items.map((it) => {
          const Q = Number(it.quantity) + Number(it.count);
          const newItem = { quantity: Q };
          Firebase.UPDATE_STOCK_ITEM(newItem, it.id);
          return newItem;
        });
        /*    if (props.item.delivered) {
          let newCash = Number(cashValue) - Number(props.item.paied);
          Firebase.UPDATE_TO_DASHBOARD_STATISTICS({
            cash: Number(newCash.toFixed(2)),
          });
        } */
        console.log(">>>> Deleting Invoice:");
        Firebase.Delete_INVOICE(item.id);
        break;
      //========

      case "STOCK_ITEMS":
        console.log(">>>> Deleting STOCK_ITEM:");
        Firebase.Delete_STOCK_ITEM(item.id);
        /*         var itemFullPrice =
          Number(props.item.quantity) * Number(props.item.netPrice);
        let newCash = Number(cashValue) - itemFullPrice;
        Firebase.UPDATE_TO_DASHBOARD_STATISTICS({
          cash: Number(newCash.toFixed(2)),
        }); */
        break;
      //========

      case "OUTLAY":
        console.log(">>>> Deleting OUTLAY:");
        Firebase.DELETE_OUTLAY(item.id);
        /*         let OUTLAYnewCash = Number(cashValue) + Number(props.item.ammount);
        Firebase.UPDATE_TO_DASHBOARD_STATISTICS({
          cash: Number(OUTLAYnewCash.toFixed(2)),
        });
        console.log("cashValue", cashValue);
        console.log("props.item.ammount", props.item.ammount);
        console.log("OUTLAYnewCash", OUTLAYnewCash); */
        break;
      //=======

      case "JOBS":
        console.log(">>>> Deleting JOB:");
        Firebase.Delete_JOBS(item.id)
          .then(function () {
            setSnackbar({
              open: true,
              type: "success",
              message: "تم الحذف بنجاح",
            });
            // console.log("Job Saved", _job);
          })
          .catch(function (error) {
            setSnackbar({
              open: true,
              type: "error",
              message: "لم يتم الحذف",
            });
            // console.log("Job not Saved", _job);
          });
        break;
      //==========

      case "COSTUMERS":
        console.log(">>>> Deleting COSTUMERS:");
        Firebase.Delete_COSTUMER(item.id)
          .then(function () {
            setSnackbar({
              open: true,
              type: "success",
              message: "تم الحذف بنجاح",
            });
            // console.log("Job Saved", _job);
          })
          .catch(function (error) {
            setSnackbar({
              open: true,
              type: "error",
              message: "لم يتم الحذف",
            });
            // console.log("Job not Saved", _job);
          });
        break;
      //==========

      default:
        Firebase.db
          .collection(collection)
          .doc(item.id)
          .delete()
          .then(function () {
            console.log("Document successfully deleted!");
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
    }
    close();
  }
  function handleCloseSnackbar() {
    setSnackbar({ ...snackbar, open: false });
  }
  //#endregion

  return (
    <div>
      {/*       <DeleteOutline
        fontSize="large"
        color="secondary"
        onClick={handleClickOpen}
      /> */}
      <SnackbarMessage
        open={snackbar.open}
        close={handleCloseSnackbar}
        type={snackbar.type}
        message={snackbar.message}
      />
      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">{"Delete !!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل حقاً تريد حذف هذا ؟
          </DialogContentText>
          <DialogContentText color="textPrimary">
            {collection}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" autoFocus>
            <span style={{ fontFamily: "Tajawal" }}>إلغاء</span>
          </Button>
          <Button onClick={() => handleDelete()} color="secondary">
            <span style={{ fontFamily: "Tajawal" }}>حذف</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
