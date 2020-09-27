import React from "react";
import "../../Styles/root.scss";
import { Box, Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <div className="footer">
      <Typography color="textSecondary" variant="h6">
        <Box
          style={{ color: "white" }}
          fontFamily="Monospace"
          letterSpacing={0}
          m={0}
        >
          Copyright © LABEXs {new Date().getFullYear()}
          {"."}
        </Box>
      </Typography>
    </div>
  );
};
export default Footer;
