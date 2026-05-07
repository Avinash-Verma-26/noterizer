import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register } from "../services/auth.api";
import type { LoginProps, RegisterProps } from "../../../types/types";

//orchestrate and maintain the various tasks
export const useAuth = () => {
  const context = useContext(AuthContext);
  const user = context?.user;
  const loading = context?.loading;
  const handleLogin = async ({ email, password }: LoginProps) => {
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
    firstname,
    lastname,
    email,
    password,
  }: RegisterProps) => {
    context?.setLoading(true);
    try {
      const data = await register({ firstname, lastname, email, password });
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
