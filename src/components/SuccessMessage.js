import React ,{useEffect} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import logo from "../images/LogoNew.svg";
import success from "../images/success.svg";
import contact from "../images/contact.svg";
import successMessage from "../images/successMessage.svg";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function SuccessMessage() {
  const { token,signupStatus } = useAuth();

  const history =  useNavigate();
  useEffect(() =>{
    if(signupStatus)
    {
      history("/")
    }
    else{
      history("/login")
    }
    

  },[signupStatus])
  
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={3} className="successMessages"></Grid>
          <Grid item xs={12} sm={9} md={9}>
            <div className="successSection">
              <img src={logo} alt="logo" className="successLogo" />
            </div>

            <div>
              <img src={success} alt="success" className="successTick" />
            </div>
            <p className="successDesc">
              You're all set to upload invoices and get early payments!
            </p>
            <Card id="successCard">
              <div className="successMessage">
                <img src={contact} alt="contact" />
                <p className="successContact">
                  Our Client Executive will now be in touch to take you through
                  the final steps
                </p>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
