import "../homepage.styles.css";
import { useNavigate } from "react-router";
import { useAuth } from "../../Auth/hooks/useAuth";
import DropZone from "../components/DropZone";
import { useState } from "react";
import AnalyzeImage from "../components/AnalyzeImage";

const Homepage = () => {
  const [hasImage, setHasImage] = useState<boolean>(false);
  const [noteImage, setNoteImage] = useState<string>("");
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
      <div className="user-summary">
        <p>Hey,</p>
        <h1>
          {user?.firstname} {user?.lastname}
        </h1>
        <button
          onClick={() => handleLogoutClick()}
          className="button primary-button"
        >
          Logout
        </button>
      </div>
      <div className="note-viewer">
        {hasImage ? (
          <AnalyzeImage setHasImage={setHasImage} noteImage={noteImage} />
        ) : (
          <DropZone setHasImage={setHasImage} setNoteImage={setNoteImage} />
        )}
      </div>
    </main>
  );
};

export default Homepage;
