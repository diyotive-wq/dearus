"use client";

import { useState } from "react";
import Image from "next/image";
import { Controller, Control } from "react-hook-form";

type SingleUploadFormProps = {
  name: string;
  control: Control<any>;
  placeholder?: string | null;
  isRequired?: boolean | null;
  isSquare?: boolean;
  isPotrait?: boolean;
  isCircle?: boolean;
};

export default function SingleUploadForm({
  name,
  control,
  placeholder,
  isRequired,
  isSquare = false,
  isPotrait = false,
  isCircle = false,
}: SingleUploadFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      rules={{ required: isRequired ?? false }}
      render={({ field }) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
            if (file.size > 1024 * 1024) {
              alert("Ukuran file maksimal 1MB");
              return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreview(reader.result as string);
              field.onChange(reader.result as string); // simpan ke form state
            };
            reader.readAsDataURL(file);
          }
        };

        const removeImage = () => {
          setPreview(null);
          field.onChange(null);
        };

        return (
          <div>
            <div
              className={`border-2 border-dashed border-gray-400 
                ${isCircle ? "w-52 h-52 sm:w-76 sm:h-74" : ""} 
                ${isSquare ? "w-full max-w-sm aspect-square" : ""} 
                ${isPotrait ? "w-full max-w-xs aspect-[9/16]" : ""} 
                ${!isCircle && !isSquare && !isPotrait ? "w-full aspect-[16/9]" : ""}
                ${isCircle ? "rounded-full" : "rounded-xl"}  
                relative flex justify-center items-center`}
            >
              {preview ? (
                <div
                  className={`relative w-full ${
                    isPotrait ? "h-79 sm:h-119" : ""
                  } ${
                    isSquare
                      ? "aspect-[2/1] sm:aspect-[4/3]"
                      : isCircle
                      ? "aspect-square"
                      : isPotrait
                      ? "aspect-[9/16]"
                      : "aspect-[16/9]"
                  } ${isCircle ? "rounded-full" : "rounded-xl"} 
                  justify-center items-center flex`}
                >
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className={`${
                      isCircle ? "rounded-full" : "rounded-xl"
                    } cursor-pointer object-cover`}
                    onClick={() => setIsModalOpen(true)}
                  />
                  <button
                    className="absolute top-2 right-2 bg-white border-2 border-[var(--color-primary)] rounded-full p-2 font-bold text-[var(--color-primary)] h-5 w-5 sm:h-9 sm:w-9 flex justify-center items-center hover:bg-[var(--color-primary)] hover:text-white text-xs"
                    onClick={removeImage}
                  >
                    X
                  </button>
                </div>
              ) : (
                <label
                  htmlFor={`file-upload-${name}`}
                  className="w-full h-full flex justify-center items-center cursor-pointer text-xs sm:text-sm text-center"
                >
                  {placeholder ?? "Upload 16:9 Picture"}
                  <input
                    id={`file-upload-${name}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            {/* Modal */}
            {isModalOpen && (
              <div
                className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center overflow-y-auto px-4 py-8"
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className="relative border-8 border-[var(--color-primary)] rounded-xl max-w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={preview ?? ""}
                    alt="Preview"
                    className="w-full max-h-[80vh] object-contain rounded-md"
                  />
                </div>
                <button
                  className="absolute top-2 right-2 bg-white border border-[var(--color-primary)] rounded-full text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white p-2 h-8 w-8 flex items-center justify-center"
                  onClick={() => setIsModalOpen(false)}
                >
                  X
                </button>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
