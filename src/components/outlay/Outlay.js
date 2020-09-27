import React, { useState, useEffect } from "react";
import Firebase from "../../Services/firebase";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
} from "@material-ui/core";
import DateCorrector from "../../Services/DateCorrector";
import FireDate from "../../Services/FireDate";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import DeleteDocument from "../../components/shares/DeleteDocument";

function Outlay() {
  const [_outlay, set_outlay] = useState([]);
  const [_outlayAmount, set_outlayAmount] = useState(0);
  const [_outlayLoading, set_outlayLoading] = useState(false);
  const [_date, set_date] = useState(new Date());
  const [_month /* , set_month */] = useState(new Date().getMonth() + 1);
  const [_year /* , set_year */] = useState(new Date().getFullYear());
  const [_openDialog, set_openDialog] = useState(false);
  const [_openDeleteDialog, set_openDeleteDialog] = useState(false);
  const [_note, set_note] = useState("");
  const [_amount, set_amount] = useState(0);

  function handleSubmit() {
    //  let list = _outlay;
    if (_amount > 0) {
      const out = {
        date: _date,
        ammount: _amount,
        note: _note,
      };

      Firebase.INSERT_OUTLAY(out)
        .then(function () {
          console.log("OUTLAY successfully Saved!");
        })
        .catch(function (error) {
          console.error("Error Saving OUTLAY: ", error);
        });
      // list.push(out);
      // set_outlay(list);
      /*    let newCash = Number(cashValue) - (Number(ammount));
        Firebase.UPDATE_TO_DASHBOARD_STATISTICS({cash:Number(newCash.toFixed(2))}); 
        console.log('ammount',ammount);
        console.log('cashValue',cashValue); */
      set_openDialog(false);
    } else {
      alert("Error !!");
    }
  }

  function GetOutlay() {
    set_outlayLoading(true);
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
    let list = [];
    Firebase.GET_OUTLAY(startDate, endDate)
      .then((res) => {
        list = res;

        set_outlayLoading(false);
        //
        console.log("res", list);
      })
      .catch((err) => {
        alert(err);
      });

    set_outlay(list);
  }

  useEffect(() => {
    GetOutlay();
    return () => {
      console.log("cleaning getoutlay()");
    };
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => set_openDialog(true)}
        style={{ margin: "10px", minWidth: "150px" }}
      >
        <h3 style={{ fontFamily: "Tajawal" }}>
          OUTLAY {_date.getMonth() + 1}/{_date.getFullYear()}
          <br />
          {_outlayLoading ? (
            <CircularProgress size={20} />
          ) : (
            <span style={{ color: "gray" }}>
              {_outlayAmount.toLocaleString("en-AU")} (s.p)
            </span>
          )}
        </h3>
      </Button>
      <Dialog open={_openDialog}>
        <DialogContent style={{ textAlign: "right", minWidth: "245px" }}>
          <h3>
            مصاريف شهر {_month}/{_year}
          </h3>
          {/*           <div id='form'>
          <div style={{ textAlign: "center" }}>
            <TextField
              id="date"
              label="التاريخ"
              type="date"
              variant="outlined"
              defaultValue={DateCorrector(new Date())}
              onChange={(e) => {
                set_date(FireDate(e.target.value));
              }}
              //className={classes.textField}
              InputLabelProps={{ shrink: true }}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="القيمة"
              type="number"
              variant="outlined"
              onChange={(e) => set_amount(e.target.value)}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="السبب"
              variant="outlined"
              onChange={(e) => set_note(e.target.value)}
            />
          </div>
          <div>
            <br />
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              color="primary"
              tybe="submit"
            >
              Submit
            </Button>
          </div>
          <hr />
          <br />
          </div>
         */}

          {_outlay.map((row) => {
            return (
              <div key={row.id}>
                {/*-------------------------------------- */}
                <Button
                  style={{ padding: "0px" }}
                  onClick={() => set_openDeleteDialog(true)}
                >
                  <DeleteOutline fontSize="small" color="secondary" />
                </Button>
                <strong>{row.note}</strong>
                <DeleteDocument
                  open={_openDeleteDialog}
                  collection="OUTLAY"
                  item={row}
                  close={set_openDeleteDialog(false)}
                />
                <span style={{ color: "red" }}>[ {row.ammount} ]</span>
                <span>{DateCorrector(row.date.toDate())}</span> <Divider />
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => set_openDialog(false)}>
            Cansel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Outlay;
