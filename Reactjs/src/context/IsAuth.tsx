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
  let localstorageVariable = localStorage.getItem("isUserAuth");
  let userCredentials: any = localstorageVariable
    ? JSON.parse(localstorageVariable)
    : {
        isUserAuth: false,
        isAdmin: false,
      };

  const [isUserLogedIn, setIsUserLogedIn] = useState(userCredentials);

  return (
    <>
      <IsAuthContext.Provider value={{ isUserLogedIn, setIsUserLogedIn }}>
        {children}
      </IsAuthContext.Provider>
    </>
  );
}
