import React, { useEffect,useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import { auth, uiConfig } from "../firebaseSetup";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import logo from "../images/LogoNew.svg";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// check user is already logged in or not if logged in then just redirect to success page
export default function Login() {
  const history = useNavigate();
  const { signupStatus } = useAuth();
  console.log(signupStatus);
 
  useEffect(() => {
     
    if (signupStatus) {
     
    } else {
      console.log("inside not loggedin condition");
      history("/login");
    }
  }, [signupStatus]);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={2} className="loginScreenVerify"></Grid>
          <Grid item xs={12} sm={9} md={9}>
            {/* <img src='../' /> */}
            <img src={logo} alt="logo" className="logoLogin" />
            <div>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
