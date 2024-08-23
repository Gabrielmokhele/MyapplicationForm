import React, { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <HeaderContext.Provider value={{ open, handleDrawerOpen, handleDrawerClose }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
