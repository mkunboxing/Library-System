import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Home from "./components/Home";
import { UserContext } from "./UserContext"


function App() {
  const { user } = useContext(UserContext);
  if (user) {
    // console.log(user)
    return <Home user={user} />;
  }
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SignUp />} />
    </Routes>
  );
}

export default App;
