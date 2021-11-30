import React, { useState, useContext, createContext } from "react";

interface AuthContextInterface {
  isUserLogedIn?: string | number | boolean;
  setIsUserLogedIn?: Function | boolean;
}

const IsUserLogedInContext = createContext<AuthContextInterface | null>(null); // We created a context

export function useUserLogedIn() {
  return useContext(IsUserLogedInContext);
}

export function IsUserLogedInProvider({ children }: any): JSX.Element {
  // Chiildren = component (compnent is an route that you want to connect to the browserRoute)
  const [isUserLogedIn, setIsUserLogedIn] = useState<boolean>(false);

  return (
    <>
      <IsUserLogedInContext.Provider
        value={{ isUserLogedIn, setIsUserLogedIn }}
      >
        {children}
      </IsUserLogedInContext.Provider>
    </>
  );
}
