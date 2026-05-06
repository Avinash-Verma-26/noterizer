import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

const Protected = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
