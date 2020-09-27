import React from "react";
import { Slide, Button } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

function About() {
  return (
    <div>
      <br /> <br /> <br />
      <h2>لابكس للخدمات الطبية والمخبرية</h2>
      <h3>تم التأسيس في عام 2019 في مدينة دمشق </h3>
      <h4>نسعد بخدمتكم في كافة المحافظات السورية</h4>
      <br />
      <br />
      <br />
      <div>
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
}

export default About;
