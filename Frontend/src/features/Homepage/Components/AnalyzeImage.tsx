import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import OCRView from "./OCRView";

type AnalyzeImageProps = {
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
  noteImage: string;
};
const AnalyzeImage = ({ setHasImage, noteImage }: AnalyzeImageProps) => {
  const { convertNote } = useUser();
  const [title, setTitle] = useState<string | null>(null);
  const [converted, setConverted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [ocr, setOcr] = useState<string>("");
  const handleConvert = async () => {
    setLoading(true);
    const encodedImage = noteImage.split(",")[1];
    const data = await convertNote(encodedImage);
    setConverted(true);
    setLoading(false);
    setOcr(data.text);
  };
  const handleAddToLibrary = async () => {};
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
            onClick={() => handleConvert()}
            className="button primary-button"
          >
            Convert
          </button>
          <button
            onClick={() => handleAddToLibrary()}
            className="button primary-button"
            disabled={!converted && title ? false : true}
          >
            Add To Library
          </button>
        </div>
      </div>
      <div className="ocr-panel">
        {converted ? (
          <OCRView ocr={ocr} title={title} setTitle={setTitle} />
        ) : loading ? (
          <div className="temporary-text">Converting Image to Text ...</div>
        ) : (
          <div className="temporary-text">
            Click on Convert to turn image to text
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzeImage;
