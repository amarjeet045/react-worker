import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebaseSetup";
import { useNavigate } from "react-router-dom";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState({});
  const [loading, setLoading] = useState(false);
  const [signupStatus, setSignUpStatus] = useState(false);
  const [error, setError] = useState("");
  const [currentUser,setCurrentUser] = useState({});
  const [location,setLocation] =  useState({});



 
  useEffect(() => {
    const geo = navigator.geolocation;
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) { 
      
        const tokens = await user.getIdToken();
        setToken(tokens);
        setSignUpStatus(true)
        setCurrentUser(user);
        // setLoading(false);
      } else {
        setSignUpStatus(false)
        // setToken("")
        // setCurrentUser(user);
        // setLoading(false);
      }
    });

    return unsubscribe;
  }, []);
  const value = {
    error,
    signupStatus,
    loading,
    token,
    currentUser,
    
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
