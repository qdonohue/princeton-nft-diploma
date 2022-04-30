import { useState, useEffect, useCallback } from "react";

import { useDropzone } from "react-dropzone";

const ImageUpload = ({
  setImageData,
}: {
  setImageData: (arg0: File) => void;
}) => {
  const [imgUrl, setImgUrl] = useState("/default.jpeg");
  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles[0]);
    const imgLocalURL = URL.createObjectURL(acceptedFiles[0]);
    setImgUrl(imgLocalURL);
    setImageData(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <div {...getRootProps({})}>
      <input {...getInputProps()} />
      <div className="relative shadow-sm border border-slate-100 rounded max-w-fit max-h-fit overflow-hidden">
        <img
          className="relative inset-0 object-cover z-0 w-4/5 h-4/5 mx-auto my-auto"
          src={imgUrl}
        />
        <div className="opacity-0 flex flex-col justify-center hover:opacity-70 hover:bg-slate-100 duration-300 absolute inset-0 z-10 flex justify-center items-center text-xl text-slate-800 font-semibold hover:cursor-pointer">
          <svg
            className="h-2/3 w-2/3"
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
          <div className="text-sm -mt-2">
            {isDragActive ? "Drop image here" : "Click or drag to change image"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
