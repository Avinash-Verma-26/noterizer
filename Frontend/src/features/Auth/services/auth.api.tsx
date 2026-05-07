import axios from "axios";
import type { LoginProps, RegisterProps } from "../../../types/types";
import { serverUrl } from "../../../main";

export async function register({
  firstname,
  lastname,
  email,
  password,
}: RegisterProps) {
  try {
    const response = await axios.post(
      `${serverUrl}/auth/register`,
      {
        firstname,
        lastname,
        email,
        password,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    console.log("Failed to register", err);
    throw err;
  }
}

export async function login({ email, password }: LoginProps) {
  try {
    const response = await axios.post(
      `${serverUrl}/auth/login`,
      { email, password },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    console.log("Failed to login", err);
    throw err;
  }
}

export async function logout() {
  try {
    const response = await axios.post(
      `${serverUrl}/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getMe() {
  try {
    const response = await axios.get(`${serverUrl}/auth/getMe`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
