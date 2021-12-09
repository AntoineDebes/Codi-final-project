import { useState, useContext, createContext } from "react";
interface isAuthContextProps {
  isUserLogedIn?: any;
  setIsUserLogedIn?: any;
}

const IsAuthContext = createContext<isAuthContextProps>({}); // We created a context

export function useIsAuthContext() {
  return useContext(IsAuthContext);
}

export function IsAuthContextProvider({ children }: any) {
  let isUserAuth = !!localStorage.getItem("isUserAuth") ?? false;

  const [isUserLogedIn, setIsUserLogedIn] = useState(isUserAuth);

  return (
    <>
      <IsAuthContext.Provider value={{ isUserLogedIn, setIsUserLogedIn }}>
        {children}
      </IsAuthContext.Provider>
    </>
  );
}
