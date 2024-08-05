"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context state
interface LocationContextType {
  source: string;
  destination: string;
  setSource: (source: string) => void;
  setDestination: (destination: string) => void;
}

// Create a context with default values
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Create a provider component
export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [source, setSource] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  return (
    <LocationContext.Provider value={{ source, destination, setSource, setDestination }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the LocationContext
export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
