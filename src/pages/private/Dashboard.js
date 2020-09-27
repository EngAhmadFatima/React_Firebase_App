import React, { useContext, useEffect, useState } from "react";
import Firebase from "../../Services/firebase";
import { Link } from "react-router-dom";
import { UserContext } from "../../Services/UserContext";
import { GlobalContext } from "../../Services/GlobalState";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Outlay from "../../components/outlay/Outlay";

function Dashboard({ history }) {
  const currentUser = useContext(UserContext);
  const globalState = useContext(GlobalContext);
  const [_Date /* , set_Date */] = useState(new Date());
  const [_stockAmount, set_stockAmount] = useState(0);
  const [_stockAmountLoading, set_stockAmountLoading] = useState(false);
  const [_invoicesAmount, set_invoicesAmount] = useState(0);
  const [_invoicesAmountLoading, set_invoicesAmountLoading] = useState(false);

  function GetStockAmount() {
    set_stockAmountLoading(true);
    let amount = 0;

    Firebase.GET_All_STOCK_ITEMS()
      .then((res) => {
        res.map((itm) => {
          return (amount = amount + itm.netPriceDolar * itm.quantity);
        });

        set_stockAmount(amount);
        set_stockAmountLoading(false);
      })
      .catch((err) => {
        console.log("GET_All_STOCK_ITEMS error", err);
      });
  }
  function GetInvoicesAmount() {
    set_invoicesAmountLoading(true);
    let amount = 0;
    var M1 = Number(_Date.getMonth() + 1);
    var Y1 = Number(_Date.getFullYear());
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
        res.map((itm) => {
          let profit =
            Number(itm.totalAmount) -
            Number(itm.discount) -
            Number(itm.netAmount);
          return (amount = amount + profit);
        });
        set_invoicesAmountLoading(false);
        set_invoicesAmount(amount);
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    GetStockAmount();
    GetInvoicesAmount();
  }, []);

  useEffect(() => {
    console.log("_stockAmount", _stockAmount);
  }, [_stockAmount]);

  if (!currentUser) {
    //history.push("/login");
    return <Link to="/login">Login</Link>;
  } else {
    return (
      <div>
        Hi, {currentUser.displayName}
        <br /> <br />
        <Button
          variant="outlined"
          style={{ margin: "10px", minWidth: "150px" }}
          component={Link}
          to="/stock"
        >
          <h3 style={{ fontFamily: "Tajawal" }}>
            STOCK
            <br />
            {_stockAmountLoading ? (
              <CircularProgress size={20} />
            ) : (
              <span style={{ color: "gray" }}>
                {_stockAmount.toLocaleString("en-AU")} ($)
              </span>
            )}
          </h3>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "10px", minWidth: "150px" }}
        >
          <h3 style={{ fontFamily: "Tajawal" }}>
            CASH
            <br />
            <span style={{ color: "gray" }}>
              {globalState.cash.toLocaleString("en-AU")}
            </span>
          </h3>
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "10px", minWidth: "150px" }}
          component={Link}
          to="/invoices"
        >
          <h3 style={{ fontFamily: "Tajawal" }}>
            PROFITS {_Date.getMonth() + 1}/{_Date.getFullYear()}
            <br />
            {_invoicesAmountLoading ? (
              <CircularProgress size={20} />
            ) : (
              <span style={{ color: "gray" }}>
                {_invoicesAmount.toLocaleString("en-AU")} (s.p)
              </span>
            )}
          </h3>
        </Button>
        <Outlay />
      </div>
    );
  }
}

export default Dashboard;
