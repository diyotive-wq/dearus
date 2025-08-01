import { useState } from "react";
import Image from "next/image";
import { on } from "events";

export default function SingleUploadForm({
  placeholder,
  isSquare = false,
  isPotrait = false,
  value,
  onChange,
}: {
  placeholder?: string | null;
  isSquare?: boolean;
  isPotrait?: boolean;
  value?: any;
  onChange?: (val: any) => void;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Untuk mengontrol modal

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      if (file.size > 1024 * 1024) {
        alert("Ukuran file maksimal 1MB");
        return;
      }
      reader.onloadend = () => {
        setImage(reader.result as string);
        onChange?.(reader.result as string); // Preview gambar setelah diupload
      };
      reader.readAsDataURL(file);
      // Mengubah file menjadi data URL
    }
  };

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed border-gray-400 ${
          isPotrait ? "w-3/4 h-80 sm:w-1/2 md:h-120" : "w-full"
        } ${
          isSquare
            ? "aspect-[2/1] sm:aspect-[4/3]"
            : isPotrait
            ? "aspect-[9/16]"
            : "aspect-[16/9]"
        } rounded-xl  relative`}
      >
        {image ? (
          <div
            className={`relative w-full ${isPotrait ? "h-79 sm:h-119" : ""} ${
              isSquare
                ? "aspect-[2/1] sm:aspect-[4/3]"
                : isPotrait
                ? "aspect-[9/16]"
                : "aspect-[16/9]"
            } rounded-xl justify-center items-center flex`}
          >
            <Image
              src={image}
              alt="Preview"
              layout="fill"
              className="rounded-xl cursor-pointer object-cover"
              onClick={openModal} // Membuka modal saat gambar diklik
            />
            {/* Tombol exit untuk menghapus gambar */}
            <button
              className="absolute top-2 right-2 bg-white border-2 border-[var(--color-primary)] rounded-full p-2 font-bold text-[var(--color-primary)] h-5 w-5 sm:h-9 sm:w-9 justify-center items-center flex hover:bg-[var(--color-primary)] hover:text-white text-xs"
              onClick={() => {
                setImage(null)
                onChange?.(null)
              }} // Menghapus gambar
            >
              X
            </button>
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="w-full h-full flex justify-center items-center cursor-pointer text-xs sm:text-sm text-center"
          >
            {placeholder ?? "Upload 16:9 Picture"}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      {/* Modal untuk menampilkan gambar dalam ukuran besar */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center overflow-y-auto px-4 py-8"
          onClick={closeModal}
        >
          <div
            className="relative border-8 border-[var(--color-primary)] rounded-xl max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image ?? ""}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-md"
            />
          </div>
          {/* Tombol exit */}
          <button
            className="absolute top-2 right-2 bg-white border border-[var(--color-primary)] rounded-full text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white p-2 h-8 w-8 flex items-center justify-center"
            onClick={closeModal}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
