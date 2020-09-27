import React, { useState, useContext, useEffect } from "react";
//import { UserContext } from "../../Services/UserContext";
import { GlobalContext } from "../../Services/GlobalState";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import StockItemsSelector from "../stock/StockItemsSelector";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

function InvoiceItem({ opVal, close, returnValue, itemUpdate, itemDelete }) {
  //#region States
  //const currentUser = useContext(UserContext);
  const globalState = useContext(GlobalContext);
  const [_selectedItem, set_selectedItem] = useState(opVal.value);

  const [_itemCount, set_itemCount] = useState(0);
  const [_itemPrice, set_itemPrice] = useState(
    _selectedItem
      ? _selectedItem.netPriceDolar * globalState.usd +
          _selectedItem.netPriceDolar * globalState.usd * 0.1
      : 0
  );
  //#endregion
  //---------------------------
  //#region Functions
  function handelSubmit() {
    if (opVal.value == null) {
      returnValue(_selectedItem, _itemCount, _itemPrice);
    } else {
      itemUpdate(opVal.value, _itemCount, _itemPrice);
    }
    closeDialog();
  }
  function selectItem(item) {
    if (item) {
      set_selectedItem(item);
      set_itemPrice(
        item.netPriceDolar * globalState.usd +
          item.netPriceDolar * globalState.usd * 0.1
      );
    }
  }

  function closeDialog() {
    set_selectedItem(null);
    set_itemCount(0);
    set_itemPrice(0);
    close();
  }
  function deleteItem() {
    if (_selectedItem) {
      itemDelete(_selectedItem);
    }
    closeDialog();
  }
  //#endregion
  //---------------------------

  useEffect(() => {
    function setValueToSelectedItem() {
      if (opVal.value) {
        set_selectedItem(opVal.value);
        set_itemCount(opVal.value.count);
        set_itemPrice(opVal.value.payPrice);
      }
    }
    setValueToSelectedItem();
    // console.log("value", opVal.value);
    //console.log("_selectedItem", _selectedItem);
    //()=>{console.log('clean setValueToSelectedItem'}
  }, [opVal.value]);

  return (
    <div>
      <Dialog open={opVal.open}>
        <DialogContent style={{ textAlign: "right" }}>
          {opVal.value ? null : (
            <StockItemsSelector returnBackItem={selectItem} />
          )}
          <Divider />
          {_selectedItem ? (
            <div id="itemInfo">
              <br />
              <span>
                <strong> {_selectedItem.name}</strong>
              </span>
              <br />
              <span>
                <strong>الكمية:</strong>
                {_selectedItem.quantity.toLocaleString("en-AU")}
              </span>
              <br />
              <span>
                <strong>أول:</strong> {_selectedItem.netPriceDolar} (
                {globalState.usd})
              </span>
              <br />
              <span>
                <strong>الشراء:</strong>
                {(_selectedItem.netPriceDolar * globalState.usd).toLocaleString(
                  "en-AU"
                )}
              </span>
              <br />
              <span>
                <strong>10%مبيع:</strong>
                {(
                  _selectedItem.netPriceDolar * globalState.usd +
                  _selectedItem.netPriceDolar * globalState.usd * 0.1
                ).toLocaleString("en-AU")}
              </span>
              <br />
              <br />
            </div>
          ) : null}
          <Divider />
          <TextField
            dir="rtl"
            type="number"
            value={_itemCount}
            onChange={(e) => set_itemCount(e.target.value)}
            label="count"
          />
          <br />
          <TextField
            dir="rtl"
            type="number"
            value={_itemPrice}
            onChange={(e) => set_itemPrice(e.target.value)}
            label="price"
          />
          <br />
          <Divider />
        </DialogContent>
        {/* ------------------------- */}
        <DialogActions>
          {opVal.value ? (
            <IconButton onClick={deleteItem}>
              <DeleteOutline fontSize="large" color="secondary" />
            </IconButton>
          ) : null}

          <IconButton onClick={handelSubmit}>ok</IconButton>
          <IconButton onClick={closeDialog}>
            <Close fontSize="large" />
          </IconButton>
        </DialogActions>
        {/* ------------------------- */}
      </Dialog>
    </div>
  );
}

export default InvoiceItem;
