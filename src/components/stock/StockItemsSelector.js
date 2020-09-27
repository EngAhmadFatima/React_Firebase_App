import React, { useEffect, useState } from "react";
import Firebase from "../../Services/firebase";
import Autocomplete from "@material-ui/lab/Autocomplete"; //createFilterOptions,
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import NewItem from "./NewItem";

const StockItemsSelector = ({ returnBackItem }) => {
  //#region States
  const [_loadingItems, set_loadingItems] = useState(false);
  const [_itemsList, set_itemsList] = useState([]);
  const [_selectedItem, set_selectedItem] = useState(null);

  //#endregion
  //------------------------------
  //#region Functions
  function GetItems() {
    set_loadingItems(true);
    Firebase.GET_All_STOCK_ITEMS()
      .then((res) => {
        set_itemsList(res);
        set_loadingItems(false);
      })
      .catch((err) => {
        alert(err);
      });
  }
  //#endregion
  //------------------------------

  useEffect(() => {
    GetItems();
    return () => {
      console.log("CleanUp GetCostumers");
    };
  }, [_selectedItem]);

  return (
    <React.Fragment>
      <NewItem value={_selectedItem} />
      <Autocomplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        dir="rtl"
        size="small"
        options={_itemsList}
        filterSelectedOptions
        getOptionLabel={(option) => option.name}
        key={(option) => option.id}
        style={{ minWidth: "250px", margin: "5px" }}
        renderOption={(option) => (
          <React.Fragment>
            <span style={{ fontFamily: "Tajawal" }}>{option.name}</span>
            <span style={{ color: "red" }}> ({option.quantity})</span>
          </React.Fragment>
        )}
        onChange={(event, newValue) => {
          set_selectedItem(newValue);
          returnBackItem(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                العناصر
              </span>
            }
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {_loadingItems ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </React.Fragment>
  );
};

export default StockItemsSelector;
