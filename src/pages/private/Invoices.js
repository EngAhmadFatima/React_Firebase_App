import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../Services/UserContext";
//import { GlobalContext } from "../../Services/GlobalState";
import Firebase from "../../Services/firebase";
import DateCorrector from "../../Services/DateCorrector";
import Grow from "@material-ui/core/Grow";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import CardHeader from "@material-ui/core/CardHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import styles from "../../Styles/jobs.module.scss";
import DeleteDocument from "../../components/shares/DeleteDocument";
//import EditIcon from "@material-ui/icons/Edit";
import {
  FormControlLabel,
  Checkbox,
  Button,
  Dialog,
  Divider,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
//import AttachMoneyOutlinedIcon from "@material-ui/icons/AttachMoneyOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SnackbarMessage from "../../components/shares/SnackbarMessage";
import NewInvoice from "../../components/invoices/NewInvoice";

function Invoices() {
  //#region States
  const currentUser = useContext(UserContext);
  //const globalState = useContext(GlobalContext);
  //const _cash = useState(globalState.cash);
  const [_invoices, set_invoices] = useState([]);
  const [_loadingInvoices, set_loadingInvoices] = useState(false);
  const [_month /* , set_month */] = useState(new Date().getMonth() + 1);
  const [_year /* , set_year */] = useState(new Date().getFullYear());
  const [_openDetailDialog, set_openDetailDialog] = useState(false);
  const [_selectedInvoice, set_selectedInvoice] = useState({});
  const [_growCard, set_GrowCard] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "تمت بنجاح",
    type: "success",
  });
  const [_opValNewInvoice, set_opValNewInvoice] = useState({
    open: false,
    value: null,
  });
  //#endregion
  //-----------------------
  //#region Functions

  function openDetailDialog(row) {
    set_selectedInvoice(row);
    set_openDetailDialog(true);
    set_GrowCard(0);
  }
  function closeDetailDialog() {
    set_openDetailDialog(false);
    set_GrowCard(0);
    //GetInvoices();
  }
  function handelOpenNewInvoiceDialog() {
    set_opValNewInvoice({ open: true, value: null });
  }
  function handelOpenEditInvoiceDialog(inv) {
    set_opValNewInvoice({ open: true, value: inv });
  }
  function handelCloseDialog() {
    set_opValNewInvoice({ open: false, value: null });
  }
  //#endregion
  //-----------------------
  //#region Functional Components
  const InvoiceCard = ({ row, titleClick, num }) => {
    var final = Number(row.totalAmount) - Number(row.discount);
    return (
      <React.Fragment>
        <Grow
          in={true}
          key={row.id}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: _growCard } : {})}
        >
          <Card
            className={styles.card}
            key={row.id}
            dir="rtl"
            variant="outlined"
          >
            <CardHeader
              //  style={{ border: "solid", padding: "0px" }}
              className={styles.cardHeader}
              /* avatar={<Avatar style={{ marginRight: "0px" }}>{num}</Avatar>} */
              /*               action={
                <IconButton onClick={editClick}>
                  <EditIcon />
                </IconButton>
              } */
              title={
                <React.Fragment>
                  <Link
                    style={{
                      fontFamily: "Tajawal",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                    color="textPrimary"
                    component="button"
                    underline="none"
                    className={styles.title}
                    onClick={titleClick}
                  >
                    {num} -{" "}
                    {row.costumerName ? row.costumerName : row.customer.name}
                  </Link>
                  {row.delivered ? (
                    <span style={{ color: "green" }}> ✔ </span>
                  ) : (
                    <span style={{ color: "red" }}> ✘ </span>
                  )}
                </React.Fragment>
              }
              subheader={
                <>
                  <span style={{ fontFamily: "Tajawal" }}>
                    {DateCorrector(row.date.toDate())}
                  </span>

                  <Button
                    style={{
                      padding: "0px",
                      marginRight: "10px",
                      color: "gray",
                    }}
                    variant="outlined"
                  >
                    {final.toLocaleString("en-AU")}
                  </Button>
                </>
              }
            />
          </Card>
        </Grow>
      </React.Fragment>
    );
  };
  const DetailDialog = ({ open, Close, row }) => {
    let total = Number(row.totalAmount);
    let net = Number(row.netAmount);
    let discount = Number(row.discount);
    let final = Number(total - discount);
    let paid = Number(row.paied);
    let rest = Number(total - discount - paid);
    let profit = Number(final - net);

    const [_paid, set_paid] = useState(paid);
    const [_discount, set_discount] = useState(discount);
    const [_rest, set_rest] = useState(rest);
    const [_profit, set_profit] = useState(profit);
    const [_final, set_final] = useState(final);
    const [_delivered, set_delivered] = useState(row.delivered);

    function handelPaidChange(value) {
      set_paid(value);
      set_rest(total - _discount - value);
    }
    function handelDiscountChange(value) {
      set_discount(value);
      set_rest(total - value - _paid);
      set_final(total - value);
      set_profit(_final - net);
    }
    function handelSubmit() {
      let inv = {
        paied: _paid,
        restAmount: _rest,
        discount: _discount,
        profit: _profit,
        delivered: _delivered,
      };

      Firebase.UPDATE_INVOICE(inv, row.id)
        .then(() => {
          setSnackbar({
            open: true,
            type: "success",
            message: "تمت التعديل بنجاح",
          });
        })
        .catch((error) => {
          setSnackbar({ open: true, type: "error", message: "لم يتم التعديل" });
        });
      Close();
    }

    return (
      <React.Fragment>
        <SnackbarMessage
          open={snackbar.open}
          close={() => setSnackbar({ ...snackbar, open: false })}
          type={snackbar.type}
          message={snackbar.message}
        />
        <Dialog open={open}>
          <DialogActions>
            <IconButton>
              <DeleteDocument item={row} collection={"INVOICES"} />
            </IconButton>
            <IconButton onClick={() => handelOpenEditInvoiceDialog(row)}>
              <EditOutlinedIcon color="inherit" fontSize="large" />
            </IconButton>
            <IconButton>
              <PrintOutlinedIcon color="inherit" fontSize="large" />
            </IconButton>
          </DialogActions>
          <Divider />
          <DialogContent style={{ textAlign: "right" }}>
            <span>
              <strong>{row.costumerName}</strong>
              <br />
              {row.date ? DateCorrector(row.date.toDate()) : ""}
            </span>

            <Divider />
            <br />
            <span>
              <strong> النهائي: [ {_final.toLocaleString("en-AU")} ]</strong>
            </span>
            <br />
            <span>
              <strong> المدفوع: [ {_paid.toLocaleString("en-AU")} ]</strong>
            </span>
            <br />
            <span>
              <strong> الباقي: [ {_rest.toLocaleString("en-AU")} ]</strong>
            </span>
            <br />
            <span>
              <strong>الخصم: [ {_discount.toLocaleString("en-AU")} ]</strong>
            </span>
            <br />
            <span>
              <strong>الربح: [ {_profit.toLocaleString("en-AU")} ]</strong>
            </span>
            <br />
            <br />
            <FormControlLabel
              label={<strong style={{ fontFamily: "Tajawal" }}>التسليم</strong>}
              control={
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                  checkedIcon={
                    <CheckBoxIcon fontSize="large" style={{ color: "green" }} />
                  }
                  checked={_delivered}
                  onChange={(e) => set_delivered(e.target.checked)}
                />
              }
            />
            <br />
            <br />
            <TextField
              placeholder="المدفوع"
              label={
                <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                  مدفوع
                </span>
              }
              value={_paid}
              type="number"
              onChange={(e) => handelPaidChange(e.target.value)}
            />
            <TextField
              placeholder="الخصم"
              label={
                <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                  خصم
                </span>
              }
              value={_discount}
              type="number"
              onChange={(e) => handelDiscountChange(e.target.value)}
            />
          </DialogContent>
          <br />
          <Divider />
          <DialogActions>
            <IconButton onClick={handelSubmit}>
              <SaveOutlinedIcon color="primary" fontSize="large" />
            </IconButton>
            <IconButton color="inherit" onClick={Close}>
              <CancelOutlinedIcon fontSize="large" />
            </IconButton>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };
  //#endregion
  //-----------------------

  useEffect(() => {
    function GetInvoices() {
      set_loadingInvoices(true);
      var M1 = Number(_month);
      var Y1 = _year;
      var M2 = 1;
      var Y2 = 1;
      if (M1 + 1 > 12) {
        M2 = 1;
        Y2 = Y1 + 1;
      } else {
        M2 = M1 + 1;
        Y2 = Y1;
      }

      const startDate = `${Y1}-${M1}-1`;
      const endDate = `${Y2}-${M2}-1`;
      Firebase.GET_INVOICES(startDate, endDate)
        .then((res) => {
          set_invoices(res);
          set_loadingInvoices(false);
          //
          console.log("res", res);
        })
        .catch((err) => {
          alert(err);
        });
    }
    set_GrowCard(2000);
    GetInvoices();
  }, [_month, _year, _openDetailDialog]);

  let num = _invoices.length + 1;
  if (currentUser) {
    return (
      <React.Fragment>
        <DetailDialog
          open={_openDetailDialog}
          Close={closeDetailDialog}
          row={_selectedInvoice}
        />
        <Button variant="outlined" onClick={handelOpenNewInvoiceDialog}>
          <span style={{ fontFamily: "Tajawal" }}>فاتورة جديدة</span>
        </Button>
        <NewInvoice opVal={_opValNewInvoice} close={handelCloseDialog} />
        <div id="listOfInvoices">
          {_loadingInvoices ? (
            <CircularProgress />
          ) : _invoices.length > 0 ? (
            _invoices.map((row) => {
              num--;
              return (
                <InvoiceCard
                  key={row.id}
                  row={row}
                  titleClick={() => openDetailDialog(row)}
                  num={num}
                />
              );
            })
          ) : (
            <h1>no data available</h1>
          )}
        </div>
        <br />
      </React.Fragment>
    );
  } else {
    return <Link to="/login">Login</Link>;
  }
}

export default Invoices;
