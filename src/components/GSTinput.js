import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import logo from "../images/LogoNew.svg";
import TextField from "@mui/material/TextField";
import { Button, Card } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function GSTinput() {
  const history = useNavigate();
  const [gstValue, setGstValue] = useState("");
  const [gstLookupCheck, setGstLookupCheck] = useState(false);
  const { token, signupStatus } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const gstLookup = async () => {
    console.log("hdhhd");
    console.log(gstValue, gstValue.length);
    if (gstValue.length === 15) {
      //  make a request for gst lookup

      // 36AADCG2928F1ZR

      const body = {
        gstNumber: gstValue,
      };
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      console.log(body);
      const requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: "follow",
      };

      fetch("https://api3.pujacapital.com/api/gstlookup", requestOption)
        .then((response) => response.text())
        .then((result) => {
          console.log(result, typeof result);

          const resultParsed = JSON.parse(result);
          console.log(resultParsed.success);

          if (resultParsed.success === true) {
            setGstLookupCheck(false);
            history("/branches", { state: resultParsed.data });
          } else {
            setGstLookupCheck(true);
            setErrorMessage(resultParsed.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //
      // throw an error
      setGstLookupCheck(true);
      setErrorMessage("GSTIN should be of 15 character");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={3} className="gstInputImage"></Grid>
          <Grid item xs={12} sm={9} md={9}>
            <a
              href="https://eqlfin.com"
              style={{
                textDecoration: "none",
                display: "block",
                textAlign: "center",
              }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ width: "150px", marginTop: "15%" }}
              />
            </a>
            <Card className="gstInputCard">
              <h2 className="gstInputHead">
                {" "}
                Let's quickly set-up your account first
              </h2>
              <p className="gstInputContent">
                Share your GSTIN so that we can automatically fetch your company
                details
              </p>
              <TextField
                label="Enter GSTIN"
                id="standard-size-normal"
                variant="standard"
                className="gstInput"
                inputProps={{
                  maxLength: 15,
                }}
                onChange={(e) => setGstValue(e.target.value)}
              />

              <Button
                variant="outlined"
                className="gstContinuebutton"
                onClick={gstLookup}
              >
                Continue
              </Button>

              {gstLookupCheck ? (
                <>
                  <p className="gstLookupError">{errorMessage}</p>
                </>
              ) : (
                ""
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
