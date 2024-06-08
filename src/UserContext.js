// // UserContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       // Optionally, fetch user details using the token
//     }
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post('/api/login', { email, password });
//       setToken(res.data.token);
//       setUser(res.data.user);
//       localStorage.setItem('token', res.data.token);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const signup = async (userData) => {
//     try {
//       const res = await axios.post('/api/signup', userData);
//       setToken(res.data.token);
//       setUser(res.data.user);
//       localStorage.setItem('token', res.data.token);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//   };

//   return (
//     <UserContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);


// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
