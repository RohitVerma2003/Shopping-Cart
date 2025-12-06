import { createContext, useContext, useState, type ReactNode } from "react";

export interface AuthUser {
  _id: string;
  name: string;
  username: string;
}

interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = localStorage.getItem("user");
  const initialUser: AuthUser | null = storedUser
    ? JSON.parse(storedUser)
    : null;

  const [authUser, setAuthUser] = useState<AuthUser | null>(initialUser);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
