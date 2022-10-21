import { createContext, FC, ReactNode, useContext, useState } from "react";

type AuthContextType = {
  myId: string;
  screenIndex: number;
  setActiveTab: Function;
};

const initialAuthContext = {
  myId: "",
  screenIndex: 0,
  setActiveTab: (value: number) => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const InfiniteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myId, setMyId] = useState<string>("");
  const [screenIndex, setScreenIndex] = useState<number>(0);

  return (
    <AuthContext.Provider
      value={{
        myId,
        screenIndex,
        setActiveTab: (value: number) => setScreenIndex(value),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
