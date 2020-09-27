import React, { useState, useContext, useEffect } from "react";
//import { UserContext } from "../../Services/UserContext";
import { GlobalContext } from "../../Services/GlobalState";
import Firebase from "../../Services/firebase";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  // Card,
  // CardHeader,
  // Link,
  Divider,
} from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import CustomersSelector from "../customers/CustomersSelector";
import InvoiceItem from "./InvoiceItem";
import InvoiceRow from "./InvoiceRow";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SnackbarMessage from "../shares/SnackbarMessage";

function NewInvoice({ opVal, close }) {
  //#region States
  // const currentUser = useContext(UserContext);
  const globalState = useContext(GlobalContext);

  //const [_obVal, set_obVal] = useState(false);
  const [_selectedCustomer, set_selectedCustomer] = useState(null);
  const [_selectedItems, set_selectedItems] = useState([]);
  const [_invAmount, set_invAmount] = useState(0);
  const [_invNetAmount, set_invNetAmount] = useState(0);
  const [_invDate /* , set_invDate */] = useState(new Date());
  const [_opVal, set_opVal] = useState({ open: false, value: null });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "تمت بنجاح",
    type: "success",
  });
  //#endregion
  //-------------------------
  //#region Functions
  function handelSelectedItem(object, count, payPrice) {
    if (object) {
      var item = {
        id: object.id,
        name: object.name,
        quantity: object.quantity,
        count: count,
        unit: object.unit,
        payPrice: payPrice,
        netPrice: Number(object.netPriceDolar) * Number(globalState.usd),
        netPriceDolar: object.netPriceDolar,
        fullNetPrice:
          Number(count) *
          Number(object.netPriceDolar) *
          Number(globalState.usd),
        fullPrice: Number(count) * Number(payPrice),
        note: "",
      };

      const index = _selectedItems.findIndex((obj) => obj.id === object.id);

      if (index > -1) {
        alert("you have add it before !!");
      } else {
        if (object.quantity === 0) {
          alert("Quantity = 0");
        }

        // Add item to selectedItems:
        const list = [..._selectedItems, item];
        set_selectedItems(list);

        var newAmount = Number(_invAmount) + Number(item.fullPrice);
        set_invAmount(newAmount);

        var newNetAmount = Number(_invNetAmount) + Number(item.fullNetPrice);
        set_invNetAmount(newNetAmount);
      }
    }
  }
  function openItemDialog() {
    set_opVal({ open: true, value: null });
  }
  function rowTitleClick(item) {
    set_opVal({ open: true, value: item });
  }
  function handelItemUpdate(object, count, payPrice) {
    const index = _selectedItems.findIndex((obj) => obj.id === object.id);
    const newObj = Object.assign({}, _selectedItems[index]);
    const obs = Object.assign([], _selectedItems);
    const newCount = Number(count);
    const newPrice = Number(payPrice);

    if (newCount > 0 && newPrice > 0) {
      newObj.count = newCount;
      newObj.payPrice = newPrice;
      newObj.fullPrice = newPrice * newCount;
      let newInvAmount =
        Number(_invAmount) -
        Number(object.fullPrice) +
        Number(newObj.fullPrice);
      console.log("_invAmount", _invAmount);
      console.log("object.fullPrice", object.fullPrice);
      console.log("newObj.fullPrice", newObj.fullPrice);
      set_invAmount(newInvAmount);
      newObj.fullNetPrice = Number(object.netPrice) * newCount;
      let newInvNetAmout =
        Number(_invNetAmount) -
        Number(object.fullNetPrice) +
        Number(newObj.fullNetPrice);
      set_invNetAmount(newInvNetAmout);
      newObj.quantity =
        Number(object.quantity) + Number(object.count) - newCount;
      obs[index] = newObj;
      set_selectedItems(obs);
    }
  }
  function handelItemDelete(object) {
    //this action will effect on:
    // 1- remove this item from selectedListItems by id
    set_selectedItems(_selectedItems.filter((row) => row.id !== object.id));
    // 2- minus this item fullPrice from invAmount
    set_invAmount(Number(_invAmount) - Number(object.fullPrice));
    // 3- minus this item fullNetPrice from invNetAmount
    set_invNetAmount(Number(_invNetAmount) - Number(object.fullNetPrice));
    // 4- if this is old item reinter item count to stock
    if (opVal.value) {
      for (var i = 0; i < opVal.value.items.length; i++) {
        if (opVal.value.items[i].id === object.id) {
          var item = {
            quantity:
              Number(opVal.value.items[i].quantity) +
              Number(opVal.value.items[i].count),
          };
          Firebase.UPDATE_STOCK_ITEM(item, object.id);
          break;
        }
      }
    }
  }
  function handelSubmit() {
    if (_selectedItems.length > 0 && _selectedCustomer) {
      if (opVal.value) {
        const inv = {
          customer: _selectedCustomer,
          date: opVal.value.date,
          totalAmount: _invAmount,
          discount: opVal.value.discount,
          delivered: opVal.value.delivered,
          paied: opVal.value.paied,
          netAmount: _invNetAmount,
          items: _selectedItems,
        };
        Firebase.UPDATE_INVOICE(inv, opVal.value.id)
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
      } else {
        const inv = {
          customer: _selectedCustomer,
          date: _invDate,
          totalAmount: _invAmount,
          discount: 0,
          delivered: false,
          paied: 0,
          netAmount: _invNetAmount,
          items: _selectedItems,
        };
        Firebase.INSERT_INVOICE(inv)
          .then(() => {
            setSnackbar({
              open: true,
              type: "success",
              message: "تمت الإضافة بنجاح",
            });
            // console.log("Customer Saved", _item);
          })
          .catch((error) => {
            setSnackbar({
              open: true,
              type: "error",
              message: "لم تتم الإضافة",
            });
            // console.log("Customer not Saved", _item);
          });
      }

      _selectedItems.map((it) => {
        Firebase.UPDATE_STOCK_ITEM({ quantity: it.quantity }, it.id)
          .then(() => {
            console.log("STOCK_ITEMS updated");
          })
          .catch((error) => {
            console.log("STOCK_ITEMS updated", error);
          });
        return it.quantity;
      });

      // props.history.push('/addInvoice');
    } else {
      alert("You have to select Costumer and items !!");
    }
    closeDialog();
  }
  function handleCloseSnackbar() {
    setSnackbar({ ...snackbar, open: false });
  }

  function closeDialog() {
    set_selectedItems([]);
    set_invAmount(0);
    set_invNetAmount(0);
    close();
  }
  //#endregion
  //-------------------------

  useEffect(() => {
    function setValueToInvoice() {
      if (opVal.value) {
        set_selectedItems(opVal.value.items);
        set_invAmount(opVal.value.totalAmount);
        set_invNetAmount(opVal.value.netAmount);
        set_selectedCustomer(opVal.value.customer);
      }
    }
    setValueToInvoice();
    //console.log("opVal.value", opVal.value);
    // console.log("_selectedItems", _selectedItems);
    return () => {
      console.log("Clean setValueToInvoice");
    };
  }, [opVal.value]);
  return (
    <React.Fragment>
      <SnackbarMessage
        open={snackbar.open}
        close={handleCloseSnackbar}
        type={snackbar.type}
        message={snackbar.message}
      />

      <Dialog open={opVal.open} style={{ minWidth: "350px" }}>
        {/* ------------------------- */}
        <DialogContent style={{ textAlign: "right" }}>
          <strong>فاتورة جديدة</strong> <br />
          <Divider />
          <br />
          {/* ------------------------- */}
          {opVal.value ? (
            <h3>{opVal.value.customer.name}</h3>
          ) : (
            <CustomersSelector returnBackCustomer={set_selectedCustomer} />
          )}
          {/* ------------------------- */}
          <Button variant="outlined" onClick={openItemDialog}>
            اضافة عنصر جديد
          </Button>
          <InvoiceItem
            opVal={_opVal}
            //  open={_openItemDialog}
            close={() => set_opVal({ open: false, value: null })}
            // value={_itemDialogValue}
            returnValue={handelSelectedItem}
            itemUpdate={handelItemUpdate}
            itemDelete={handelItemDelete}
          />
          {/* ------------------------- */}
          <br />
          <br />
          <Divider />
          <div id="info">
            <br />
            <strong>{_selectedCustomer ? _selectedCustomer.name : null}</strong>
            <br />
            <span>{new Date().toDateString()}</span>
            <List>
              {_selectedItems.length > 0
                ? _selectedItems.map((row) => {
                    return (
                      <InvoiceRow
                        key={row.id}
                        row={row}
                        titleClick={() => rowTitleClick(row)}
                      />
                    );
                  })
                : null}
            </List>
            <br />
            <strong>المجموع: </strong>
            <span>{_invAmount.toLocaleString("en-AU")}</span>
            <br />
            <strong>الربح: </strong>
            <span>{(_invAmount - _invNetAmount).toLocaleString("en-AU")}</span>
          </div>
        </DialogContent>
        {/* ------------------------- */}
        <DialogActions>
          <IconButton onClick={handelSubmit}>
            <CheckCircleIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={closeDialog}>
            <CloseOutlined fontSize="large" />
          </IconButton>
        </DialogActions>
        {/* ------------------------- */}
      </Dialog>
    </React.Fragment>
  );
}

export default NewInvoice;
