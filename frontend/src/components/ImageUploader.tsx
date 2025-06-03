import React, { useState, ChangeEvent, useCallback, useRef } from "react";
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";
import "./ImageUploader.css"; // Styles applied from here
import { FiUploadCloud } from "react-icons/fi";

interface ImageUploaderProps {
  onFileSelect: (file: File | null, previewUrl: string | null) => void;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileSelect,
  disabled,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // For legacy browse

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setIsClicked(false); // Reset click state on drop
      setError(null);
      if (rejectedFiles && rejectedFiles.length > 0) {
        setError(
          `Fichier non supporté ou trop volumineux. Formats acceptés : JPEG, PNG, GIF, MP4, MOV, AVI.`
        );
        onFileSelect(null, null);
        return;
      }
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        onFileSelect(file, previewUrl);
      } else {
        onFileSelect(null, null); 
      }
    },
    [onFileSelect]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  }: {
    getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
    isDragActive: boolean;
    isDragAccept: boolean; 
    isDragReject: boolean; 
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "video/x-msvideo": [".avi"],
    },
    multiple: false,
    disabled: disabled,
    onDragEnter: () => setIsClicked(false),
    
  });

  const handleLegacyFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsClicked(false); 
    const file = event.target.files?.[0];
    if (file) {
      
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/quicktime",
        "video/x-msvideo",
      ];
      if (allowedTypes.includes(file.type)) {
        const previewUrl = URL.createObjectURL(file);
        onFileSelect(file, previewUrl);
        setError(null);
      } else {
        setError("Type de fichier non supporté via la sélection manuelle.");
        onFileSelect(null, null);
      }
    } else {
      onFileSelect(null, null);
    }
    if (event.target) {
      
      event.target.value = "";
    }
  };

  const handleMouseDown = () => {
    if (!disabled) setIsClicked(true);
  };
  const handleMouseUpOrLeave = () => {
    // Remove class after a short delay to allow animation to play
    setTimeout(() => setIsClicked(false), 300); 
  };

  const handleBrowseClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation(); 
    inputRef.current?.click();
  };

  return (
    <div
      {...getRootProps({
        className: `image-uploader-dropzone 
          ${isDragActive && isDragAccept ? "active" : ""} 
          ${isDragReject ? "reject" : ""}
          ${disabled ? "disabled" : ""}
          ${isClicked ? "upload-clicked" : ""}`,
      })}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave} 
      tabIndex={disabled ? -1 : 0} 
    >
      <input {...getInputProps()} ref={inputRef} style={{ display: "none" }} />{" "}
      <div className="upload-icon-container">
        {" "}
        <FiUploadCloud className="uploader-icon" />
      </div>
      {isDragActive ? (
        isDragReject ? (
          <p className="uploader-text-main">
            Ce type de fichier n'est pas supporté
          </p>
        ) : (
          <p className="uploader-text-main">Déposez le fichier ici...</p>
        )
      ) : (
        <>
          <p className="uploader-text-main">
            Glissez-déposez un fichier ici, ou{" "}
            <span
              className="browse-link"
              onClick={handleBrowseClick}
              role="button"
              tabIndex={-1} // To avoid double tabbing if parent is already focusable
            >
              Parcourir
            </span>
          </p>
          <p className="uploader-text-sub">
            Formats supportés : JPEG, PNG, GIF, MP4, MOV, AVI
          </p>
        </>
      )}
      {error && <p className="error-message">{error}</p>}
      
    </div>
  );
};

export default ImageUploader;
