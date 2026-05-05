import { createContext, useState } from "react";
import type { ReactNode } from "react";
type AuthContextType = {
  user: unknown;
  setUser: React.Dispatch<React.SetStateAction<unknown>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
