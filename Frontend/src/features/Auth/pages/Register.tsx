import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };
  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              placeholder="Enter email address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            className="button primary-button"
          >
            Register
          </button>
        </form>
        <p>
          Already have an account? <Link to={"/login"}>LogIn</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
