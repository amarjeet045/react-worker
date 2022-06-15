import firebase from "firebase/compat/app"
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_FIREBASE_APPID,
  measurementId: process.env.REACT_FIREBASE_MEASUREMENTID,
});

export const auth =  app.auth();

export const uiConfig = {
    signInSuccessUrl: `http://localhost:3000/gstinput`,
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: "image",
          size: "invisible",
          badge: "bottomright",
        },
        defaultCountry: "IN",
      },
    ],
    signInFlow: "popup",
   
}
export default app;