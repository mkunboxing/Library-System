import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  if (user) {
    return <Home />;
  }

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}

export default App;
