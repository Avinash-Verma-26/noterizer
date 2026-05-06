import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getMe } from "./services/auth.api";

type User = {
  username: string;
  email: string;
  id: string;
};
type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
