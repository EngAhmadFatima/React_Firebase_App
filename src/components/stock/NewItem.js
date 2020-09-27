import React, { useState } from "react";
import {
  Link as MuiLink,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  DialogTitle,
} from "@material-ui/core";
import Firebase from "../../Services/firebase";
import SnackbarMessage from "../shares/SnackbarMessage";
import DeleteDocument from "../shares/DeleteDocument";

function EditCustomer({ value }) {
  //#region States
  const [_openFormDialog, set_openFormDialog] = useState(false);
  const [_item, set_item] = useState({
    name: "",
    quantity: 0,
    unit: "",
    netPrice: 0,
    netPriceDolar: 0,
    type: "itemType",
    category: "itemCategory",
    payPrice: 0,
    packaging1: "packaging1",
    packaging2: "packaging2",
    minCount: 0,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "تمت بنجاح",
    type: "success",
  });
  //#endregion
  //--------------------------
  //#region Functions
  function handelSubmitForm(e) {
    e.preventDefault();
    if (value) {
      Firebase.UPDATE_STOCK_ITEM(_item, value.id)
        .then(function () {
          setSnackbar({
            open: true,
            type: "success",
            message: "تمت التعديل بنجاح",
          });
          console.log("Customer Updated", _item);
        })
        .catch(function (error) {
          setSnackbar({ open: true, type: "error", message: "لم يتم التعديل" });
          console.log("Customer not Updated", _item);
        });
    } else {
      Firebase.INSERT_STOCK_ITEM(_item)
        .then(function () {
          setSnackbar({
            open: true,
            type: "success",
            message: "تمت الإضافة بنجاح",
          });
          console.log("Customer Saved", _item);
        })
        .catch(function (error) {
          setSnackbar({ open: true, type: "error", message: "لم تتم الإضافة" });
          console.log("Customer not Saved", _item);
        });
    }
    set_openFormDialog(false);
  }
  function setValueToName(value) {
    set_item(value);
  }
  function openFormDialog() {
    set_openFormDialog(true);
    if (value) {
      setValueToName(value);
    }
  }
  function setItemValues(e) {
    set_item({
      ..._item,
      [e.target.name]: e.target.value,
    });
  }
  function handleCloseSnackbar() {
    setSnackbar({ ...snackbar, open: false });
  }
  //#endregion

  /*   useEffect(() => {
    ///setValueToName(value);
    console.log("value", value);
  }, [value]);
  useEffect(() => {
    console.log("_name", _item);
  }, [_item]); */
  return (
    <React.Fragment>
      <SnackbarMessage
        open={snackbar.open}
        close={handleCloseSnackbar}
        type={snackbar.type}
        message={snackbar.message}
      />
      <MuiLink component="button" onClick={openFormDialog}>
        <span style={{ fontFamily: "Tajawal", margin: "5px" }}>
          {value ? "تعديل" : "عنصر جديد"}
        </span>
      </MuiLink>
      <Dialog open={_openFormDialog}>
        <DialogTitle style={{ padding: "0px", margin: "0px" }}>
          {value ? (
            <DeleteDocument
              collection="STOCK_ITEMS"
              item={value}
              onClick={() => set_openFormDialog(false)}
            />
          ) : null}
        </DialogTitle>
        <form>
          <DialogContent>
            <div id="name">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    الاسم
                  </span>
                }
                size="small"
                dir="rtl"
                name="name"
                variant="outlined"
                value={_item.name}
                onChange={setItemValues}
              />
            </div>
            <div id="quantity">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    الكمية
                  </span>
                }
                size="small"
                dir="rtl"
                name="quantity"
                variant="outlined"
                value={_item.quantity}
                onChange={setItemValues}
              />
            </div>
            <div id="netPrice">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    سعر الشراء
                  </span>
                }
                size="small"
                dir="rtl"
                name="netPrice"
                variant="outlined"
                value={_item.netPrice}
                onChange={setItemValues}
              />
            </div>
            <div id="netPriceDolar">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    سعر الشراء $
                  </span>
                }
                size="small"
                dir="rtl"
                name="netPriceDolar"
                variant="outlined"
                value={_item.netPriceDolar}
                onChange={setItemValues}
              />
            </div>
            <div id="payPrice">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    سعر البيع
                  </span>
                }
                size="small"
                dir="rtl"
                name="payPrice"
                variant="outlined"
                value={_item.payPrice}
                onChange={setItemValues}
              />
            </div>
            <div id="unit">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    الوحدة
                  </span>
                }
                size="small"
                dir="rtl"
                name="unit"
                variant="outlined"
                value={_item.unit}
                onChange={setItemValues}
              />
            </div>
            <div id="category">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    الصنف
                  </span>
                }
                size="small"
                dir="rtl"
                name="category"
                variant="outlined"
                value={_item.category}
                onChange={setItemValues}
              />
            </div>
            <div id="type">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    النوع
                  </span>
                }
                size="small"
                dir="rtl"
                name="type"
                variant="outlined"
                value={_item.type}
                onChange={setItemValues}
              />
            </div>
            <div id="minCount">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    العدد الأدنى
                  </span>
                }
                size="small"
                dir="rtl"
                name="minCount"
                variant="outlined"
                value={_item.minCount}
                onChange={setItemValues}
              />
            </div>
            <div id="packaging1">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    تعبئة1
                  </span>
                }
                size="small"
                dir="rtl"
                name="packaging1"
                variant="outlined"
                value={_item.packaging1}
                onChange={setItemValues}
              />
            </div>
            <div id="packaging2">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    تعبئة2
                  </span>
                }
                size="small"
                dir="rtl"
                name="packaging2"
                variant="outlined"
                value={_item.packaging2}
                onChange={setItemValues}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => set_openFormDialog(false)}
              color="default"
            >
              <span style={{ fontFamily: "Tajawal" }}>إلغاء</span>
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={handelSubmitForm}
            >
              <span style={{ fontFamily: "Tajawal" }}>
                {value ? "تعديل" : "إضافة"}
              </span>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default EditCustomer;
