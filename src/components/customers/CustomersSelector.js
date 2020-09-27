import React, { useEffect, useState } from "react";
import Firebase from "../../Services/firebase";
import Autocomplete from "@material-ui/lab/Autocomplete"; //createFilterOptions,
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
//import { Link as MuiLink } from "@material-ui/core";
//import CircularProgress from "@material-ui/core/CircularProgress";
//import NewCustomerDialog from "./NewCustomer";
//import NewCustomer from "./NewCustomer";
import EditCustomer from "./EditCustomer";

const CustomersSelector = ({ returnBackCustomer }) => {
  //#region States
  const [_loadingCustoers, set__loadingCustoers] = useState(false);
  const [_CustomersList, set_customerList] = useState([]);
  const [_selectedCustomer, set_selectedCustomer] = useState(null);

  //#endregion
  //------------------------------
  //#region Functions
  /*   function GetCostumersList() {
    let list = [
      { name: "مخبر1", type: "مخبر تحاليل طبية" },
      { name: "مخبر2" },
      { name: "مخبر3" },
    ];
    set_customerList(list);
  } */
  function GetCostumers() {
    set__loadingCustoers(true);
    // set_LoadingCostumers(true);
    Firebase.GET_All_COSTUMERS()
      .then((res) => {
        set_customerList(res);
        set__loadingCustoers(false);
      })
      .catch((err) => {
        alert(err);
      });
    // set_LoadingCostumers(false);
  }
  //#endregion
  //------------------------------

  useEffect(() => {
    GetCostumers();
    return () => {
      console.log("CleanUp GetCostumers");
    };
  }, [_selectedCustomer]);

  return (
    <React.Fragment>
      <EditCustomer value={_selectedCustomer} />
      <Autocomplete
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        dir="rtl"
        size="small"
        options={_CustomersList}
        filterSelectedOptions
        getOptionLabel={(option) => option.name}
        key={(option) => option.id}
        style={{ minWidth: "250px", margin: "5px" }}
        onChange={(event, newValue) => {
          set_selectedCustomer(newValue);
          returnBackCustomer(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={
              <span style={{ fontFamily: "Tajawal", textAlign: "right" }}>
                الزبون
              </span>
            }
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {_loadingCustoers ? (
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

/* function CustomersSelector({ selectedCostumer }) {
  const [_costumers, set_costumers] = useState([]);
  const [_loadingCostumers, set_LoadingCostumers] = useState(false);

  const [_selectedValue, set_selectedValue] = useState(null);

  //const [dialogValue, setDialogValue] = React.useState(null);
  const [_newCustomerDialog, set_newCustomerDialog] = React.useState({
    open: false,
    _new: true,
    value: _selectedValue,
  });
  const filter = createFilterOptions();

  function handelCloseDialog() {
    set_newCustomerDialog({ open: false, _new: true });
  }

  useEffect(() => {
    GetCostumers();
    return () => {
      console.log("clean");
    };
  }, []);

  function GetCostumers() {
    set_LoadingCostumers(true);
    Firebase.GET_All_COSTUMERS()
      .then((res) => {
        set_costumers(res);
      })
      .catch((err) => {
        alert(err);
      });
    set_LoadingCostumers(false);
  }

  return (
    <React.Fragment>
      <NewCustomer
        open={_newCustomerDialog.open}
        close={handelCloseDialog}
        value={_newCustomerDialog.value}
        _new={_newCustomerDialog._new}
      />
      {_selectedValue ? (
        <MuiLink
          component="button"
          variant="body2"
          onClick={() => {
            set_newCustomerDialog({
              open: true,
              _new: false,
              value: _selectedValue,
            });
          }}
        >
          <span style={{ fontFamily: "Tajawal", margin: "5px" }}>تعديل</span>
        </MuiLink>
      ) : null}
      <Autocomplete
        style={{ minWidth: "250px", margin: "5px" }}
        // value={_costumers}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              selectedCostumer({
                name: newValue,
              });
              set_selectedValue({
                name: newValue,
              });
              set_newCustomerDialog({
                open: true,
                _new: true,
                value: _selectedValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            selectedCostumer({
              name: newValue.inputValue,
            });
            set_selectedValue({
              name: newValue.inputValue,
            });
            set_newCustomerDialog({
              open: true,
              _new: true,
              value: _selectedValue,
            });
          } else {
            set_selectedValue(newValue);
            selectedCostumer(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={_costumers}
        /*  getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }} */
/*  getOptionLabel={(option) => option.name}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name}
        freeSolo
        dir="rtl"
        size="small"
        renderInput={(params) =>
          _loadingCostumers ? (
            <CircularProgress size={15} />
          ) : (
            <TextField
              {...params}
              style={{ fontFamily: "Tajawal" }}
              dir="rtl"
              placeholder="الزبون"
              variant="outlined"
            />
          )
        }
      /> */
//{
/*       <Autocomplete
        dir="rtl"
        freeSolo
        size="small"
        id="SelectCustomer"
        options={_costumers}
        // filterSelectedOptions
        key={(option) => option.id}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,
                year: "",
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
              year: "",
            });
          } else {
            selectedCostumer(newValue);
          }
        }}

        renderInput={(params) =>
          _loadingCostumers ? (
            <CircularProgress size={15} />
          ) : (
            <TextField
              {...params}
              style={{ fontFamily: "Tajawal" }}
              dir="rtl"
              placeholder="الزبون"
              variant="outlined"
            />
          )
        }
      /> */
//}
//  </React.Fragment>
//  );
//} */

export default CustomersSelector;
