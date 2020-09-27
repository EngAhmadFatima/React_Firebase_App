import React, { useState } from "react";
import Firebase from "../../Services/firebase";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useForm } from "../../hooks/useForm";
import SnackbarMessage from "../shares/SnackbarMessage";
import { Link as MuiLink } from "@material-ui/core";

function NewCustomer({ value, isNew }) {
  const [_openDialog, set_OpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "تمت بنجاح",
    type: "success",
  });
  function handleClickOpenDialog() {
    set_OpenDialog(true);
  }
  function handelCloseDialog() {
    set_OpenDialog(false);
  }

  const [_customer, set_customer] = useState({
    name: value ? value.name : "hhhh",
    type: value ? value.type : "",
    responsible: value ? value.responsible : "",
    country: value ? value.country : "",
    area: value ? value.area : "",
    address: value ? value.address : "",
    whatsapp: value ? value.whatsapp : "",
    mobile: value ? value.mobile : "",
    phone: value ? value.phone : "",
    email: value ? value.email : "",
  });

  function setCustomerValue(e) {
    set_customer({ ..._customer, [e.target.name]: e.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNew) {
      Firebase.INSERT_COSTUMER(_customer)
        .then(function () {
          setSnackbar({
            open: true,
            type: "success",
            message: "تمت الإضافة بنجاح",
          });
          console.log("customer", value);
          handelCloseDialog();
        })
        .catch(function (error) {
          setSnackbar({
            open: true,
            type: "error",
            message: "!! لم تتم الاضافة",
          });
          handelCloseDialog();
        });
    } else {
      Firebase.UPDATE_COSTUMER(_customer, _customer.id)
        .then(function () {
          setSnackbar({
            open: true,
            type: "success",
            message: "تمت التعديل بنجاح",
          });
          console.log("customer", value);
          handelCloseDialog();
        })
        .catch(function (error) {
          setSnackbar({
            open: true,
            type: "error",
            message: "!! لم يتم التعديل",
          });
          handelCloseDialog();
        });
    }
  };
  function handleCloseSnackbar() {
    setSnackbar({ ...snackbar, open: false });
  }
  function setValueToCustomer() {
    value ? set_customer(value) : set_customer(_customer);
  }

  React.useEffect(() => {
    //  setValueToCustomer();
    console.log("value", value);
    console.log("_customer", _customer);
  }, []);

  if (_customer != null) {
    return (
      <div>
        {/*--------------------------------------------------------------*/}
        <MuiLink component="button" onClick={handleClickOpenDialog}>
          <span style={{ fontFamily: "Tajawal", margin: "5px" }}>
            {isNew ? "إضافة" : "تعديل"}
          </span>
        </MuiLink>
        {/*--------------------------------------------------------------*/}
        <SnackbarMessage
          open={snackbar.open}
          close={handleCloseSnackbar}
          type={snackbar.type}
          message={snackbar.message}
        />
        {/*--------------------------------------------------------------*/}
        <Dialog open={_openDialog} onClose={handelCloseDialog}>
          <form onSubmit={handleSubmit}>
            <DialogContent style={{ textAlign: "right" }}>
              <React.Fragment>
                {isNew ? (
                  <h3>إضافة زبون جديد</h3>
                ) : (
                  <h3>تعديل بيانات الزبون</h3>
                )}

                <div id="name">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    multiline
                    required
                    size="small"
                    dir="rtl"
                    name="name"
                    variant="outlined"
                    placeholder="* اسم المؤسسة"
                    defaultValue={_customer.name}
                    onChange={setCustomerValue}
                  />
                </div>
                <div id="type">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    size="small"
                    multiline
                    required
                    dir="rtl"
                    name="type"
                    variant="outlined"
                    placeholder="* النوع"
                    value={_customer.type}
                    //onChange={handelChangeCustomer}
                  />
                </div>
                <div id="responsible">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    size="small"
                    multiline
                    dir="rtl"
                    name="responsible"
                    variant="outlined"
                    placeholder="اسم المسؤول"
                    value={_customer.responsible}
                    //  onChange={handelChangeCustomer}
                  />
                </div>
                <div id="country">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    size="small"
                    multiline
                    required
                    dir="rtl"
                    name="country"
                    variant="outlined"
                    placeholder="* المدينة"
                    value={_customer.country}
                    // onChange={handelChangeCustomer}
                  />
                </div>
                <div id="area">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    size="small"
                    multiline
                    required
                    dir="rtl"
                    name="area"
                    variant="outlined"
                    placeholder="* المنطقة"
                    value={_customer.area}
                    //  onChange={handelChangeCustomer}
                  />
                </div>
                <div id="address">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    size="small"
                    multiline
                    dir="rtl"
                    name="address"
                    variant="outlined"
                    placeholder="العنوان"
                    value={_customer.address}
                    //  onChange={handelChangeCustomer}
                  />
                </div>
                <div id="whatsapp">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    size="small"
                    multiline
                    required
                    dir="rtl"
                    name="whatsapp"
                    variant="outlined"
                    placeholder="* وتساب"
                    value={_customer.whatsapp}
                    //  onChange={handelChangeCustomer}
                  />
                </div>
                <div id="mobile">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    size="small"
                    multiline
                    required
                    dir="rtl"
                    name="mobile"
                    variant="outlined"
                    placeholder="* جوال"
                    value={_customer.mobile}
                    //   onChange={handelChangeCustomer}
                  />
                </div>
                <div id="phone">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    size="small"
                    multiline
                    dir="rtl"
                    name="phone"
                    variant="outlined"
                    placeholder="هاتف"
                    value={_customer.phone}
                    //  onChange={handelChangeCustomer}
                  />
                </div>
                <div id="email">
                  <TextField
                    style={{ minWidth: "250px", margin: "5px" }}
                    size="small"
                    multiline
                    dir="rtl"
                    name="email"
                    variant="outlined"
                    placeholder="بريد الكتروني"
                    value={_customer.email}
                    //  onChange={handelChangeCustomer}
                  />
                </div>
              </React.Fragment>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                onClick={handelCloseDialog}
                color="default"
              >
                <span style={{ fontFamily: "Tajawal" }}>إلغاء</span>
              </Button>
              <Button variant="contained" type="submit" color="primary">
                <span style={{ fontFamily: "Tajawal" }}>إضافة</span>
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/*--------------------------------------------------------------*/}
      </div>
    );
  } else return null;
}

export default NewCustomer;
