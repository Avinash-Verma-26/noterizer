import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register } from "../services/auth.api";

type LoginType = {
  email: string;
  password: string;
};
type RegisterType = {
  username: string;
  email: string;
  password: string;
};
//orchestrate and maintain the various tasks
export const useAuth = () => {
  const context = useContext(AuthContext);
  const user = context?.user;
  const loading = context?.loading;
  const handleLogin = async ({ email, password }: LoginType) => {
    context?.setLoading(true);
    try {
      const data = await login({ email, password });
      context?.setUser(data.user);
      context?.setLoading(false);
    } catch (err) {
      console.log("Failed to login", err);
      throw err;
    } finally {
      context?.setLoading(false);
    }
  };
  const handleRegister = async ({
    username,
    email,
    password,
  }: RegisterType) => {
    context?.setLoading(true);
    try {
      const data = await register({ username, email, password });
      context?.setUser(data.user);
      context?.setLoading(false);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      context?.setLoading(false);
    }
  };
  const handleLogout = async () => {
    context?.setLoading(true);
    try {
      await logout();
      context?.setUser(null);
      context?.setLoading(false);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      context?.setLoading(false);
    }
  };
  return { user, loading, handleLogin, handleLogout, handleRegister };
};
