import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Slide,
  //  DialogContent,
  // DialogActions,
  Button,
  //Dialog,
  Grow,
  Divider,
} from "@material-ui/core";
import Logo from "../Statics/images/logo.png";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
/* import DoneIcon from "@material-ui/icons/Done";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import ToysOutlinedIcon from "@material-ui/icons/ToysOutlined";
import OpacityOutlinedIcon from "@material-ui/icons/OpacityOutlined";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import CallMissedOutlinedIcon from "@material-ui/icons/CallMissedOutlined";
 */ import KeyboardArrowLeftOutlinedIcon from "@material-ui/icons/KeyboardArrowLeftOutlined";

const Home = () => {
  // const [_openDialog, set_openDialog] = useState(false);
  return (
    <div>
      <div id="logo">
        <br />
        <Grow
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 1000 } : {})}
        >
          <img
            alt="LABEXs"
            src={Logo}
            style={{ width: "200px", height: "200px" }}
          />
        </Grow>
        <br />
        <br />
        <Grow
          // direction="up"
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 1000 } : {})}
        >
          <Box
            style={{ color: "#8E2437" }}
            fontSize={{
              xs: "h6.fontSize",
              sm: "h6.fontSize",
              md: "h4.fontSize",
              l: "h3.fontSize",
            }}
          >
            كافة الخدمات الطبية والمخبرية بين يديك
          </Box>
        </Grow>
        <br />
      </div>
      <Divider />
      {/*       <Button
        size="large"
        variant="outlined"
        onClick={() => set_openDialog(true)}
      >
        <CallMissedOutlinedIcon fontSize="large" />
        <span
          style={{
            marginRight: "5px",
            fontFamily: "Tajawal",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          اضغط هنا وانطلق
        </span>
      </Button> */}
      {/* <Dialog open={_openDialog} style={{ textAlign: "right" }}>
        <DialogContent>
          <h3>تجهيزات و معدات</h3>
          <p>مجموعة متنوعة من التجهيزات والمعدات الطبية والمخبرية</p>
          <Divider />
          <h3> كواشف ومستهلكات </h3>
          <p>مجموعة متنوعة من الكواشف والمستهلكات الطبية والمخبرية</p>
          <Divider />
          <h3> فرص عمل </h3>
          <p>منصة مهمة لنشر وتأمين فرص عمل للعاملين في القطاع الطبي</p>
          <Divider />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
       */}
      <br />
      <div id="services">
        <Slide
          direction="left"
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 3000 } : {})}
        >
          <Button component={Link} to="/jobs">
            <span
              style={{
                marginRight: "5px",
                fontFamily: "Tajawal",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              فرص عمل
            </span>
            <KeyboardArrowLeftOutlinedIcon />
          </Button>
        </Slide>
        {/*         <Slide
          direction="left"
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 3000 } : {})}
        >
          <Button component={Link} to="/jobs">
            <span
              style={{
                marginRight: "5px",
                fontFamily: "Tajawal",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              الدليل الطبي
            </span>
            <KeyboardArrowLeftOutlinedIcon />
          </Button>
        </Slide> */}
        <br />
        <Slide
          direction="left"
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 4000 } : {})}
        >
          <Button component={Link} to="/jobs">
            <span
              style={{
                marginRight: "5px",
                fontFamily: "Tajawal",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              تجهيزات ومعدات
            </span>
            <KeyboardArrowLeftOutlinedIcon />
          </Button>
        </Slide>
        <br />
        <Slide
          direction="left"
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 5000 } : {})}
        >
          <Button component={Link} to="/jobs">
            <span
              style={{
                marginRight: "5px",
                fontFamily: "Tajawal",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              كواشف ومستهلكات
            </span>
            <KeyboardArrowLeftOutlinedIcon />
          </Button>
        </Slide>
      </div>
      <br />
      <Divider />
      <br />
      <br />
      <div id="contact">
        <Slide
          direction="up"
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 3000 } : {})}
        >
          <Button
            style={{ color: "#8E2437", textAlign: "left" }}
            //    variant="outlined"
            onClick={() => window.open("https://wa.me/963943444596")}
          >
            <WhatsAppIcon /> 0943444596
          </Button>
        </Slide>
        <Slide
          direction="up"
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 4000 } : {})}
        >
          <Button
            style={{ color: "#8E2437", textAlign: "left" }}
            //  variant="outlined"
            onClick={() => window.open("https://www.facebook.com/myLABEXs/")}
          >
            <FacebookIcon /> fb/myLABEXs
          </Button>
        </Slide>

        <Slide
          direction="up"
          in={true}
          style={{ transformOrigin: "0 0 0" }}
          {...(true ? { timeout: 5000 } : {})}
        >
          <Button
            style={{ color: "#8E2437", textAlign: "left" }}
            //    variant="outlined"
            onClick={() => window.open("mailto:mylabexs@gmail.com")}
          >
            <EmailOutlinedIcon /> mylabexs@gmail.com
          </Button>
        </Slide>
      </div>
    </div>
  );
};

export default Home;
