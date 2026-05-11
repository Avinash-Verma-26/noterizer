import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import OCRView from "./OCRView";

type AnalyzeImageProps = {
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
  noteImage: string;
  onNoteSaved: () => void;
};

const AnalyzeImage = ({ setHasImage, noteImage, onNoteSaved }: AnalyzeImageProps) => {
  const { convertNote, addNote } = useUser();
  const [title, setTitle] = useState<string>("");
  const [converted, setConverted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [ocr, setOcr] = useState<string>("");

  const handleConvert = async () => {
    setLoading(true);
    const encodedImage = noteImage.split(",")[1];
    const data = await convertNote(encodedImage);
    setConverted(true);
    setLoading(false);
    setOcr(data.text);
  };

  const handleAddToLibrary = async () => {
    if (!converted || !title.trim()) return;
    setSaving(true);
    await addNote(title.trim(), ocr);
    setSaving(false);
    onNoteSaved();
  };

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
            disabled={loading}
          >
            {loading ? "Converting..." : "Convert"}
          </button>
          <button
            onClick={handleAddToLibrary}
            className="button primary-button"
            disabled={!converted || !title.trim() || saving}
          >
            {saving ? "Saving..." : "Add to Library"}
          </button>
        </div>
      </div>
      <div className="ocr-panel">
        {converted ? (
          <OCRView ocr={ocr} title={title} setTitle={setTitle} />
        ) : loading ? (
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
