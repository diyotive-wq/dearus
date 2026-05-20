"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ImageViewerProps = {
  src: string;
  keyName?: string | null;
  width?: number;
  height?: number;
  alt: string;
  color?: string;
  classname?: string | null;
  classnameImage?: string | null;
};

export default function ImageViewer({
  src,
  keyName,
  width,
  height,
  alt,
  classname,
  color,
  classnameImage,
}: ImageViewerProps) {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showImage]);

  // Deteksi apakah ukuran di-define manual atau mengisi container
  const isFill = width === undefined && height === undefined;

  return (
    <>
      <div
        key={keyName || undefined}
        className={`${
          classname ?? "relative w-full aspect-square flex justify-center items-center"
        } cursor-pointer`}
        onClick={() => setShowImage(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill={isFill}
          width={!isFill ? width : undefined}
          height={!isFill ? height : undefined}
          className={`${classnameImage || "object-cover"}`}
          sizes="(max-w-md) 100vw, 33vw"
          unoptimized
        />
      </div>

      {/* LIGHTBOX POPUP MODAL */}
      {showImage && (
        <div
          className="fixed inset-0 w-full h-screen flex items-center justify-center bg-black/75 backdrop-blur-sm z-50 transition-opacity duration-300 p-4"
          onClick={() => setShowImage(false)}
        >
          {/* Tombol Silang Bawaan yang Cantik */}
          <button
            className="absolute top-6 right-6 h-10 w-10 justify-center items-center flex bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer z-50 text-lg border border-white/20 backdrop-blur-md"
            onClick={(e) => {
              e.stopPropagation(); // Mencegah bentrok click container
              setShowImage(false);
            }}
          >
            ✕
          </button>

          {/* Kontainer Gambar Preview */}
          <div
            className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} // Supaya klik fotonya tidak menutup modal
          >
            <img
              src={src || ""}
              alt="Preview Besar"
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl select-none"
            />
          </div>
        </div>
      )}
    </>
  );
}