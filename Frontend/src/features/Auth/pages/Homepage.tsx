import { useAuth } from "../hooks/useAuth";
import "../../../styles/buttons.css";
import { useNavigate } from "react-router";

const Homepage = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };
  if (!user) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  return (
    <main className="home-container">
      <h1>Welcome</h1>
      <p>User: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <button
        onClick={() => handleLogoutClick()}
        className="button primary-button"
      >
        Logout
      </button>
    </main>
  );
};

export default Homepage;
