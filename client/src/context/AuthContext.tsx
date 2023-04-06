import Cookies from "js-cookie";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface IAuthContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

const initialStateAuthContext: IAuthContext = {
  isAuth: false,
  setIsAuth: () => {},
  token: null,
  setToken: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialStateAuthContext);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") ?? null);
  useEffect(() => {
    if (token === null) Cookies.remove("token");
    setIsAuth(!!token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};
