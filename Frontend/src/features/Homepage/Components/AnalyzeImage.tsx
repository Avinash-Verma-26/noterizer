import React from "react";
import { convertNote } from "../services/notes.api";
type AnalyzeImageProps = {
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
  noteImage: string;
};
const AnalyzeImage = ({ setHasImage, noteImage }: AnalyzeImageProps) => {
  const handleConvert = async (noteImage: string) => {
    const encodedImage = noteImage.split(",")[1];
    const data = await convertNote({ encodedImage });
    console.log(data);
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
            ReUpload
          </button>
          <button
            onClick={() => handleConvert(noteImage)}
            className="button primary-button"
          >
            Convert
          </button>
        </div>
      </div>
      <div className="ocr-panel"></div>
    </div>
  );
};

export default AnalyzeImage;
