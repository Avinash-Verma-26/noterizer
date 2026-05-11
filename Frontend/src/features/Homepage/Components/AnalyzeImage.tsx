import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import OCRView from "./OCRView";

type AnalyzeImageProps = {
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
  noteImage: string;
  onNoteSaved: () => void;
};

type Stage = "idle" | "converting" | "converted" | "saving";

const AnalyzeImage = ({ setHasImage, noteImage, onNoteSaved }: AnalyzeImageProps) => {
  const { convertNote, addNote } = useUser();
  const [title, setTitle] = useState<string>("");
  const [ocr, setOcr] = useState<string>("");
  const [stage, setStage] = useState<Stage>("idle");

  const handleConvert = async () => {
    setStage("converting");
    const encodedImage = noteImage.split(",")[1];
    const data = await convertNote(encodedImage);
    setOcr(data.text);
    setStage("converted");
  };

  const handleAddToLibrary = async () => {
    if (!ocr || !title.trim()) return;
    setStage("saving");
    await addNote(title.trim(), ocr);
    onNoteSaved();
  };

  const canSave = stage === "converted" && !!title.trim() && !!ocr;

  return (
    <div className="image-analyzer">
      <div className="image-preview">
        <img src={noteImage} alt="Note Preview" />
        <div className="image-functions">
          <button
            onClick={() => setHasImage(false)}
            className="button primary-button"
          >
            Re-upload
          </button>
          <button
            onClick={handleConvert}
            className="button primary-button"
            disabled={stage !== "idle"}
          >
            {stage === "converting" ? "Converting..." : "Convert"}
          </button>
          <button
            onClick={handleAddToLibrary}
            className="button primary-button"
            disabled={!canSave}
          >
            {stage === "saving" ? "Saving..." : "Add to Library"}
          </button>
        </div>
      </div>

      <div className="ocr-panel">
        {stage === "converted" || stage === "saving" ? (
          <OCRView ocr={ocr} title={title} setTitle={setTitle} />
        ) : stage === "converting" ? (
          <div className="temporary-text">Converting image to text...</div>
        ) : (
          <div className="temporary-text">
            Click Convert to turn the image into text
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzeImage;
