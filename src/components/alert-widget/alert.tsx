"use client";

import { useEffect } from "react";

type AlertProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
};

export default function Alert({ message, type = "info", onClose }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 4000); // auto close 4 detik
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded-md shadow-md fixed top-4 right-4 z-50 transition-opacity duration-300`}
      role="alert"
    >
      <div className="flex justify-between items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="text-white font-bold">
          ×
        </button>
      </div>
    </div>
  );
}
