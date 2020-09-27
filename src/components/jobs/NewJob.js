import React, { useContext, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  // IconButton,
  DialogTitle,
} from "@material-ui/core";
import Firebase from "../../Services/firebase";
import { UserContext } from "../../Services/UserContext";
import { Link } from "react-router-dom";
import CustomersSelector from "../customers/CustomersSelector";
import SnackbarMessage from "../shares/SnackbarMessage";
import DeleteDocument from "../shares/DeleteDocument";

function AddStockItem({ value, open, close }) {
  //#region States
  // const [_openDialog, set_OpenDialog] = useState(false);
  const [_selectedCostumer, set_SelectedCostumer] = useState(null);
  const currentUser = useContext(UserContext);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "تمت بنجاح",
    type: "success",
  });
  const [_job, set_job] = useState({
    date: new Date(),
    title: "",
    description: "",
    experience: "",
    shift: "",
    views: 0,
    available: true,
    customer: _selectedCostumer,
  });
  //#endregion
  //-----------------------------
  //#region Functions

  function handleCloseSnackbar() {
    setSnackbar({ ...snackbar, open: false });
  }
  /*   function handleClickOpenDialog() {
    set_OpenDialog(true);
    setValueToJob();
  } */
  /*   function handelCloseDialog() {
    set_OpenDialog(false);
  } */
  function setJobValues(e) {
    set_job({
      ..._job,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (value == null) {
      Firebase.INSERT_JOBS(_job)
        .then(function () {
          setSnackbar({
            open: true,
            type: "success",
            message: "تمت الإضافة بنجاح",
          });
          console.log("Job Saved", _job);
        })
        .catch(function (error) {
          setSnackbar({ open: true, type: "error", message: "لم تتم الإضافة" });
          console.log("Job not Saved", _job);
        });
    } else {
      Firebase.UPDATE_JOBS(_job, value.id)
        .then(function () {
          setSnackbar({
            open: true,
            type: "success",
            message: "تمت التعديل بنجاح",
          });
          console.log("Job Saved", _job);
        })
        .catch(function (error) {
          setSnackbar({ open: true, type: "error", message: "لم يتم التعديل" });
          console.log("Job not Saved", _job);
        });
    }

    close();
  }
  function handelCustomerSelect(value) {
    set_SelectedCostumer(value);
    set_job({ ..._job, customer: value });
  }
  //#endregion
  //-----------------------------

  useEffect(() => {
    function setValueToJob() {
      let jo = {
        date: new Date(),
        title: "",
        description: "",
        experience: "",
        shift: "",
        views: 0,
        available: true,
        customer: _selectedCostumer,
      };
      if (value) {
        set_job(value);
      } else {
        set_job(jo);
      }
    }
    setValueToJob();
    return () => {
      console.log("");
    };
  }, [_selectedCostumer, value]);

  if (currentUser == null) {
    return <Link to="/login">Login</Link>;
  } else {
    return (
      <div>
        <SnackbarMessage
          open={snackbar.open}
          close={handleCloseSnackbar}
          type={snackbar.type}
          message={snackbar.message}
        />
        <Dialog open={open}>
          <DialogTitle style={{ padding: "0px", margin: "0px" }}>
            {value ? (
              <DeleteDocument collection="JOBS" item={value} onClick={close} />
            ) : null}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent
              style={{
                textAlign: "right",
                paddingTop: "0px",
                marginTop: "0px",
              }}
            >
              {value ? (
                <h3 style={{ paddingTop: "0px", marginTop: "0px" }}>
                  تعديل فرصة عمل
                </h3>
              ) : (
                <h3 style={{ paddingTop: "0px", marginTop: "0px" }}>
                  اضافة فرصة عمل
                </h3>
              )}
              <div id="customerSelector">
                {value ? (
                  <h3>{value.customer.name}</h3>
                ) : (
                  <CustomersSelector
                    returnBackCustomer={handelCustomerSelect}
                  />
                )}
              </div>
              <div id="title">
                <TextField
                  style={{ minWidth: "250px", margin: "5px" }}
                  multiline
                  required
                  label={
                    <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                      عنوان فرصة العمل
                    </span>
                  }
                  size="small"
                  dir="rtl"
                  name="title"
                  variant="outlined"
                  placeholder="عنوان فرصة العمل"
                  value={_job.title}
                  onChange={setJobValues}
                />
              </div>
              <div id="experience">
                <TextField
                  style={{ minWidth: "250px", margin: "5px" }}
                  multiline
                  required
                  label={
                    <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                      الخبرة المطلوبة
                    </span>
                  }
                  size="small"
                  dir="rtl"
                  name="experience"
                  variant="outlined"
                  value={_job.experience}
                  onChange={setJobValues}
                />
              </div>
              <div id="shift">
                <TextField
                  style={{ minWidth: "250px", margin: "5px" }}
                  multiline
                  required
                  label={
                    <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                      توقيت الدوام
                    </span>
                  }
                  size="small"
                  dir="rtl"
                  name="shift"
                  variant="outlined"
                  value={_job.shift}
                  onChange={setJobValues}
                />
              </div>
              <div id="description">
                <TextField
                  style={{ minWidth: "250px", margin: "5px" }}
                  multiline
                  required
                  label={
                    <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                      الوصف
                    </span>
                  }
                  size="small"
                  dir="rtl"
                  name="description"
                  variant="outlined"
                  value={_job.description}
                  onChange={setJobValues}
                />
              </div>
              <div id="customerInfo">
                {_selectedCostumer ? (
                  <>
                    <strong>الاسم:</strong>
                    <span> {_selectedCostumer.name}</span>
                    <br />
                    <strong>المكان:</strong>{" "}
                    <span>
                      {_selectedCostumer.country} - {_selectedCostumer.area}
                    </span>
                    <br />
                    <strong>جوال:</strong>
                    <span> {_selectedCostumer.mobile}</span>
                    <br />
                  </>
                ) : null}
              </div>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={close} color="default">
                <span style={{ fontFamily: "Tajawal" }}>إلغاء</span>
              </Button>
              <Button variant="contained" type="submit" color="primary">
                <span style={{ fontFamily: "Tajawal" }}>
                  {value ? "تعديل" : "إضافة"}
                </span>
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default AddStockItem;
