import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
type DropZoneProps = {
  setHasImage: React.Dispatch<React.SetStateAction<boolean>>;
  setNoteImage: React.Dispatch<React.SetStateAction<string>>;
};
const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: "0.05rem",
  borderStyle: "solid",
  borderColor: "#777777",
  borderRadius: "1rem",
  backgroundColor: "var(--primary-color)",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle: React.CSSProperties = {
  borderColor: "#2196f3",
};

const acceptStyle: React.CSSProperties = {
  borderColor: "#00e676",
};

const rejectStyle: React.CSSProperties = {
  borderColor: "#ff1744",
};
const DropZone = ({ setHasImage, setNoteImage }: DropZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log(acceptedFiles[0]);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setNoteImage(dataUrl);
      setHasImage(true);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: { "image/*": [] } });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );
  return (
    <div className="drop-container" {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop note images here or click select files</p>
      )}
    </div>
  );
};

export default DropZone;
