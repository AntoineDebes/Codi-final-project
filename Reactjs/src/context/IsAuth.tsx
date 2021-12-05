import { useState, useContext, createContext } from "react";
interface isAuthContextProps {
  isUserLogedIn?: boolean;
  setIsUserLogedIn?: Function;
}

const IsAuthContext = createContext<isAuthContextProps>({}); // We created a context

export function useIsAuthContext() {
  return useContext(IsAuthContext);
}

export function IsAuthContextProvider({ children }: any) {
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);

  return (
    <>
      <IsAuthContext.Provider value={{ isUserLogedIn, setIsUserLogedIn }}>
        {children}
      </IsAuthContext.Provider>
    </>
  );
}
