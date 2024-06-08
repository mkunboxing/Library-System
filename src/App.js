import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import axios from "axios";
import { useUser } from "./UserContext";
import { useAuth} from './context/AuthContext';  

function App() {
  const { user } = useAuth();
  console.log(user);
 


  if (user) {
    return <Home/>;
  }

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}
      <Route path="/" element={<SignUp />} />
    </Routes>
  );
}

export default App;
