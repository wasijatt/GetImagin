"use client";
import { createContext, useContext, useState } from 'react';

const SmoothScrollContext = createContext({
  isEnabled: true,
  setIsEnabled: () => {},
});

export const SmoothScrollProvider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <SmoothScrollContext.Provider value={{ isEnabled, setIsEnabled }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScrollContext = () => useContext(SmoothScrollContext); 