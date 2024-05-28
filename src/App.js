import React,{useEffect,useState} from 'react';
import {Route, Routes } from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Home from './components/Home';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();


function App() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in',user);
        setUser(user);
      } else {
        console.log('User is signed out');
        setUser(null);
      }
    });
  },[])

  if(user){
    return <Home />

  }
  
  return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignUp />} />

        {/* Add other routes as needed */}
      </Routes>
   
  );
}

export default App;
