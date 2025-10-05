import React, { createContext, useState } from 'react';

// 1️⃣ Create the Context
export const AppContext = createContext();

// 2️⃣ Create a Provider component
export const AppProvider = ({ children }) => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false); 
    const toggleTheme = () =>
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  

  return (
    <AppContext.Provider
      value={{
        toggleTheme,

        drawerOpen,
        setDrawerOpen,
        userLoggedIn,
        setUserLoggedIn,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};
