// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/auth/user`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the token in the Authorization header
                libraryId: localStorage.getItem("user")
                  ? JSON.parse(localStorage.getItem("user")).libraryId
                  : null,
              },
            }
          );
          setUser(res.data.user);
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      { email, password }
    );
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    console.log(res.data.user);
  };

  const signup = async (name, email, password) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
      { name, email, password }
    );
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    console.log(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
