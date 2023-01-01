import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./comp/Signup";
import Login from "./comp/Login";
import ForgotPassword from "./comp/ForgotPassword";
import UpdateProfile from "./comp/UpdateProfile";
import Dashboard from "./comp/Dashboard";
import { Container } from "react-bootstrap";
import AuthProvider from "./context/AuthContext";
import RequireAuth from "./context/RequireAuth";

const App = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/" element={<RequireAuth> <Dashboard /> </RequireAuth>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
};

export default App;
