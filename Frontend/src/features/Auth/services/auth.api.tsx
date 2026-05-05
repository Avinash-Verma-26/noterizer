import axios from "axios";
const serverUrl = "http://localhost:3000/api/auth";

type RegisterProps = {
  username: string;
  email: string;
  password: string;
};
type LoginProps = {
  email: string;
  password: string;
};

export async function register({ username, email, password }: RegisterProps) {
  try {
    const response = await axios.post(
      `${serverUrl}/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function login({ email, password }: LoginProps) {
  try {
    const response = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function logout() {
  try {
    const response = await axios.post(`${serverUrl}/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMe() {
  try {
    const response = await axios.get(`${serverUrl}/getMe`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
