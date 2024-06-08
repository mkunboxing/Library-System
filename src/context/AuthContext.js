import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/current_user`);
        console.log("log from authContext", res.data);
        setUser(res.data);
        console.log(user, "this is from authContext");
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await axios.get('/api/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
