import { createContext, FC, ReactNode, useContext, useState } from "react";

type AuthContextType = {
  myId: string;
};

const initialAuthContext = {
  myId: "",
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const InfiniteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myId, setMyId] = useState<string>("");

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
