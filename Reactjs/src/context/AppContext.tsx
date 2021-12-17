import { useState, useContext, createContext } from "react";
interface isAuthContextProps {
  appContext?: any;
  setAppContext?: any;
}

const AppContextCreate = createContext<isAuthContextProps>({});

export function useAppContext() {
  return useContext(AppContextCreate);
}

export function AppContextCreateProvider({ children }: any) {
  const [appContext, setAppContext] = useState<any>();

  return (
    <AppContextCreate.Provider value={{ appContext, setAppContext }}>
      {children}
    </AppContextCreate.Provider>
  );
}
