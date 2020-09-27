import React, { useState, useEffect } from "react";
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
  const [_customer, set_customer] = useState({
    name: "ini name",
    type: "",
    responsible: "",
    country: "",
    area: "",
    address: "",
    whatsapp: "",
    mobile: "",
    phone: "",
    email: "",
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
      Firebase.UPDATE_COSTUMER(_customer, value.id)
        .then(function () {
          setSnackbar({
            open: true,
            type: "success",
            message: "تمت التعديل بنجاح",
          });
          // console.log("Customer Updated", _customer);
        })
        .catch(function (error) {
          setSnackbar({ open: true, type: "error", message: "لم يتم التعديل" });
          //  console.log("Customer not Updated", _customer);
        });
    } else {
      Firebase.INSERT_COSTUMER(_customer)
        .then(function () {
          setSnackbar({
            open: true,
            type: "success",
            message: "تمت الإضافة بنجاح",
          });
          // console.log("Customer Saved", _customer);
        })
        .catch(function (error) {
          setSnackbar({ open: true, type: "error", message: "لم تتم الإضافة" });
          // console.log("Customer not Saved", _customer);
        });
    }
    set_openFormDialog(false);
  }
  function setValueToName(value) {
    set_customer(value);
  }
  function openFormDialog() {
    set_openFormDialog(true);
    if (value) {
      setValueToName(value);
    }
  }
  function setCustomerValues(e) {
    set_customer({
      ..._customer,
      [e.target.name]: e.target.value,
    });
  }
  function handleCloseSnackbar() {
    setSnackbar({ ...snackbar, open: false });
  }
  //#endregion

  useEffect(() => {
    ///setValueToName(value);
    console.log("value", value);
  }, [value]);
  useEffect(() => {
    console.log("_name", _customer);
  }, [_customer]);

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
          {value ? "تعديل" : "زبون جديد"}
        </span>
      </MuiLink>
      <Dialog open={_openFormDialog}>
        <DialogTitle style={{ padding: "0px", margin: "0px" }}>
          {value ? (
            <DeleteDocument
              collection="COSTUMERS"
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
                    اسم المؤسسة
                  </span>
                }
                size="small"
                dir="rtl"
                name="name"
                variant="outlined"
                value={_customer.name}
                onChange={setCustomerValues}
              />
            </div>
            <div id="type">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    تصنيف المؤسسة
                  </span>
                }
                size="small"
                dir="rtl"
                name="type"
                variant="outlined"
                value={_customer.type}
                onChange={setCustomerValues}
              />
            </div>
            <div id="responsible">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    اسم المسؤول
                  </span>
                }
                size="small"
                dir="rtl"
                name="responsible"
                variant="outlined"
                value={_customer.responsible}
                onChange={setCustomerValues}
              />
            </div>
            <div id="country">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    المدينة
                  </span>
                }
                size="small"
                dir="rtl"
                name="country"
                variant="outlined"
                value={_customer.country}
                onChange={setCustomerValues}
              />
            </div>
            <div id="area">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    المنطقة
                  </span>
                }
                size="small"
                dir="rtl"
                name="area"
                variant="outlined"
                value={_customer.area}
                onChange={setCustomerValues}
              />
            </div>
            <div id="address">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    العنوان
                  </span>
                }
                size="small"
                dir="rtl"
                name="address"
                variant="outlined"
                value={_customer.address}
                onChange={setCustomerValues}
              />
            </div>
            <div id="whatsapp">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    وتساب
                  </span>
                }
                size="small"
                dir="rtl"
                name="whatsapp"
                variant="outlined"
                value={_customer.whatsapp}
                onChange={setCustomerValues}
              />
            </div>
            <div id="mobile">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    جوال
                  </span>
                }
                size="small"
                dir="rtl"
                name="mobile"
                variant="outlined"
                value={_customer.mobile}
                onChange={setCustomerValues}
              />
            </div>
            <div id="phone">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                required
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    هاتف
                  </span>
                }
                size="small"
                dir="rtl"
                name="phone"
                variant="outlined"
                value={_customer.phone}
                onChange={setCustomerValues}
              />
            </div>
            <div id="email">
              <TextField
                style={{ minWidth: "250px", margin: "5px" }}
                multiline
                label={
                  <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                    بريد الكتروني
                  </span>
                }
                size="small"
                dir="rtl"
                name="email"
                variant="outlined"
                value={_customer.email}
                onChange={setCustomerValues}
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
