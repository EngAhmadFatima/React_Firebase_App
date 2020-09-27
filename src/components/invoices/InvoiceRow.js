import React from "react";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";

function InvoiceRow({ row, titleClick }) {
  return (
    <div style={{ marginTop: "5px" }}>
      <span>
        <span style={{ color: "gray" }}> [ </span>
        <span style={{ color: "red" }}>
          {Number(row.payPrice).toLocaleString("en-AU")}
        </span>
        <span style={{ color: "gray" }}> * </span>
        <span style={{ color: "green" }}>
          {Number(row.count).toLocaleString("en-AU")}
        </span>
        <span style={{ color: "gray" }}> = </span>
        <span style={{ color: "blue" }}>
          {(Number(row.payPrice) * Number(row.count)).toLocaleString("en-AU")}
        </span>
        <span style={{ color: "gray" }}> ] </span>
      </span>
      <Link href="#" underline="none" onClick={titleClick}>
        <strong>{row.name}</strong>
      </Link>

      <Divider />
    </div>
  );
}

export default InvoiceRow;
