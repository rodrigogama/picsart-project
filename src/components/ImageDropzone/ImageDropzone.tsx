import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { sixteenMB } from "../../shared/consts";
import { FileReaderHelper } from "../../shared/utils/helpers";

export const ImageDropzone: React.FC<Props> = ({ onImageLoaded }) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        const imageSrc = await FileReaderHelper.readAsDataURL(file);
        if (typeof imageSrc === "string") {
          onImageLoaded(imageSrc);
        }
      }
    },
    [onImageLoaded]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: sixteenMB,
    multiple: false,
  });

  return (
    <div
      className="cursor-pointer border border-dashed border-gray-500 rounded-md relative p-4 max-w-xl mx-auto"
      {...getRootProps()}
    >
      <input data-testid="dropzone-input" {...getInputProps()} />
      <CloudArrowUpIcon className="mx-auto fill-brand-primary h-20 w-20" />

      {isDragAccept && (
        <p className="text-center text-lg font-bold text-gray-800 py-2">
          Drop your file here
        </p>
      )}

      {!isDragActive && (
        <p className="text-center text-lg font-bold text-gray-800 py-2">
          Drag your file here or click to
          <span className="font-bold text-brand-primary"> browse</span>
        </p>
      )}

      <p
        className={clsx("text-center text-sm text-gray-600", {
          "text-red-500 text-lg font-semibold": isDragReject,
        })}
      >
        Only image files are allowed
      </p>
    </div>
  );
};

type Props = {
  onImageLoaded: (imageSrc: string) => void;
};
