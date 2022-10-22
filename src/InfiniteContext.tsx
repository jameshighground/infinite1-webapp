import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

type AuthContextType = {
  myEmail: string;
  setMyEmail(e: string): void;
  screenIndex: number;
  setActiveTab: Function;
};

const initialAuthContext = {
  myEmail: "",
  screenIndex: 0,
  setActiveTab: (value: number) => {},
  setMyEmail: (e: string) => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const InfiniteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myEmail, setMyEmail] = useState<string>("");
  const [screenIndex, setScreenIndex] = useState<number>(0);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setMyEmail(email);
    }
  }, []);
  axios.defaults.baseURL = "https://infinite1.app";
  axios.defaults.headers.common["Authorization"] = `Bearer ${myEmail ?? ""}`;

  return (
    <AuthContext.Provider
      value={{
        myEmail,
        setMyEmail,
        screenIndex,
        setActiveTab: (value: number) => setScreenIndex(value),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
