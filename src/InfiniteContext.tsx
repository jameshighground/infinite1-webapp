import { createContext, FC, ReactNode, useContext, useState } from "react";
import axios from "axios";

type AuthContextType = {
  myId: string;
};

const initialAuthContext = {
  myId: "",
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const InfiniteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myId, setMyId] = useState<string>("");

  const url = "https://infinite1.app";
  axios.defaults.baseURL = url + "/api/v1";
  return (
    <AuthContext.Provider
      value={{
        myId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
