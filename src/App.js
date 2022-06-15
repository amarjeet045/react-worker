import "./App.css";
import BranchSelector from "./components/BranchSelector";
import GSTinput from "./components/GSTinput";
import Login from "./components/Login";
import SuccessMessage from "./components/SuccessMessage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
function App() {
  return (
    <AuthProvider>
    <BrowserRouter basename="/">
     
        <Routes>
        <Route path="/" element={<SuccessMessage />} />r
          <Route path="/verify-phone" element={<Login />} />
          <Route path="/enter-gstin" element={<GSTinput />} />
          <Route path="/company-location" element={<BranchSelector />} />
          <Route path="/account-setup-successful" element={<SuccessMessage />} />
        


        </Routes>
      
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
