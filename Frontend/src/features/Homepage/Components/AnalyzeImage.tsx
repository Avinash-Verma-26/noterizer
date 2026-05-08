import React, { useState } from "react";
import { useUser } from "../hooks/useUser";

type AnalyzeImageProps = {
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
  noteImage: string;
};
const { convertNote } = useUser();
const AnalyzeImage = ({ setHasImage, noteImage }: AnalyzeImageProps) => {
  const [converted, setConverted] = useState<boolean>(false);
  const [ocr, setOcr] = useState<string>("");
  const handleConvert = async () => {
    const encodedImage = noteImage.split(",")[1];
    const data = await convertNote(encodedImage);
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
            onClick={() => handleConvert()}
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
