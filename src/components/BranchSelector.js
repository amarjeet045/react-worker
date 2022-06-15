import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../images/LogoNew.svg";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Details } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function BranchSelector() {
  const { state } = useLocation();
  const history = useNavigate();

  
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [color, setColor] = useState("#000");
  const [active, setActive] = useState("");
  const { token ,currentUser,signupStatus} = useAuth();

  console.log(token)

  const editGstNumber =  (e) => {
    e.preventDefault();
    history("/gstinput")
  };
  const handleAddressSelector = async (e, details) => {
    setBackgroundColor("#1904FF");
    setColor("#fff");
    setActive(details);
    e.preventDefault();
    const body = {
      companyLogo:"",
      timezone: 'Asia/Kolkata',
      gst: state.gstNumber,
      yearOfEstablishment: 2022,
      timestamp: Date.now(),
      firstContact: { phoneNumber: currentUser.phoneNumber },
      geopoint:null
      
    }
    // const myHeadersOffice = new Headers();
    // myHeadersOffice.append("Authorization", `Bearer ${token}`);
      const requestOption = {
        method: "POST",
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        redirect: "follow",
      };
      console.log(JSON.stringify(requestOption))

      fetch("https://api2.pujacapital.com/api/services/office", requestOption)
        .then((response) => response.text())
        .then((result) => {
          console.log(result, typeof result);

          const resultParsed = JSON.parse(result);
          console.log(resultParsed.success);

          // if (resultParsed.success === true) {
          //   setGstLookupCheck(false);
          //   history("/branches", { state: resultParsed.data });
          // } else {
          //   setGstLookupCheck(true);
          //   setErrorMessage(resultParsed.message);
          // }
        })
        .catch((error) => {
          console.log(error);
        });

    
    // do the api request
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            className="branchSelectorImage"
          ></Grid>
          <Grid item xs={12} sm={9} md={9}>
            <a href="https://eqlfin.com" style={{ textDecoration: "none" }}>
              <img
                src={logo}
                alt="logo"
                className="logo"
                style={{ width: "150px" }}
              />
            </a>
            <h2 className="welcomeCompany">Welcome {state.legalName}</h2>
            <p className="gstNumber">
              GSTIN {state.gstNumber}
              <span className="editIcon" onClick={editGstNumber}>
                <EditIcon />
              </span>
            </p>
            <p className="selectCompany">Select Your Company Location</p>
            <Box sx={{ flexGrow: 1 }} className="loactionCards">
              <Grid container spacing={2}>
                {state.address.map((addr, index) => {
                  return (
                    <>
                      <Grid item xs={12} sm={9} md={6}>
                        <Card
                          id="locationCard"
                          onClick={(e) => handleAddressSelector(e, addr)}
                          key={addr}
                          style={{
                            backgroundColor:
                              active === addr ? "#1904FF" : "#fff",
                            color: active === addr ? "#FFF" : "#000",
                          }}
                        >
                          <div className="cardAddr">
                            <span
                              className="location"
                              style={{
                                color: active === addr ? "#fff" : "#1904ff",
                              }}
                            >
                              <LocationOnIcon />
                            </span>
                            <span
                              className="locationCardContent"
                              style={{
                                color: active === addr ? "#fff" : "#000",
                              }}
                            >
                              {addr}
                            </span>
                          </div>
                        </Card>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
