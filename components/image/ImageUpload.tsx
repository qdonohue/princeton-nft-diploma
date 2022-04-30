import { useState, useEffect, useCallback } from "react";

import { useDropzone } from "react-dropzone";

const ImageUpload = ({
  setImageData,
  resetImage,
}: {
  setImageData: (arg0: File, arg1: string) => void;
  resetImage: () => void;
}) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const imgLocalURL = URL.createObjectURL(acceptedFiles[0]);

    setImageData(acceptedFiles[0], imgLocalURL);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-48 h-48 mx-auto my-auto bg-slate-200 border border-dashed rounded-2xl border-black flex flex-col items-center hover:bg-slate-300 hover:shadow-xl",
      })}
    >
      <input {...getInputProps()} />
      <svg
        className="mx-auto my-auto h-2/3 w-2/3 text-black"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="text-sm font-light">
        {isDragActive ? "Drop your file here" : "Upload your own image"}
      </div>
      <div className="text-xs font-light pb-2">(png or jpeg)</div>
    </div>
  );
};

export default ImageUpload;
