import React from "react";
type AnalyzeImageProps = {
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
  noteImage: string;
};
const AnalyzeImage = ({ setHasImage, noteImage }: AnalyzeImageProps) => {
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
          <button className="button primary-button">Convert</button>
        </div>
      </div>
      <div className="ocr-panel"></div>
    </div>
  );
};

export default AnalyzeImage;
