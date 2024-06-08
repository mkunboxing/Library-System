import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './context/AuthContext'; // Import useAuth hook

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { user } = useAuth(); // Get user data from AuthContext
  console.log(user,"this is form userContext");

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
