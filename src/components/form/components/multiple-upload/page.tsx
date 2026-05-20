import { useState } from "react";
import { Controller, Control } from "react-hook-form";

type Props = {
  name: string;
  control: Control<any>;
  isRequired?: boolean | null;
  maxFiles?: number | null;
};

export default function MultipleUploadForm({
  name,
  control,
  isRequired,
  maxFiles = 3,
}: Props) {
  const [preview, setPreview] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ✅ helper convert file -> base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      rules={{ required: isRequired ?? false }}
      render={({ field }) => (
        <div className="flex flex-col items-start gap-2">
          {/* Upload Button */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onClick={(e) => {
                if ((field.value?.length || 0) >= (maxFiles ?? true)) {
                  alert(`Maksimal ${maxFiles} file`);
                  e.preventDefault();
                }
              }}
              onChange={async (e) => {
                const newFiles = Array.from(e.target.files || []);
                if ((field.value?.length || 0) + newFiles.length > (maxFiles ?? true)) {
                  alert(`Maksimal ${maxFiles} file`);
                  return;
                }

                // convert ke base64
                const base64Files = await Promise.all(
                  newFiles.map((file) => fileToBase64(file))
                );

                const updatedFiles = [...(field.value || []), ...base64Files];
                field.onChange(updatedFiles);

                setPreview([...preview, ...base64Files]);
              }}
            />
            <div className="bg-[var(--color-primary-lightest)] border-dashed border-[var(--color-primary)] border text-[var(--color-primary)] text-[11px] sm:text-sm font-semibold px-[12px] py-[8px] rounded-xl inline-flex w-auto">
              + Upload Image
            </div>
          </label>

          {/* Thumbnail Preview */}
          <div className="flex gap-2 flex-wrap mt-2">
            {preview.map((src, idx) => (
              <div key={idx} className="relative w-20 h-20">
                {/* Tombol Hapus */}
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-[var(--color-primary)] text-white rounded-full w-5 h-5 flex justify-center items-center font-bold text-xs"
                  onClick={() => {
                    const updatedFiles = (field.value || []).filter(
                      (_: string, i: number) => i !== idx
                    );
                    field.onChange(updatedFiles);

                    const updatedPreview = preview.filter((_, i) => i !== idx);
                    setPreview(updatedPreview);
                  }}
                >
                  ✕
                </button>

                {/* Thumbnail */}
                <img
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(src)}
                />
              </div>
            ))}
          </div>

          {/* Modal Preview */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                alt="full-preview"
                className="w-auto max-h-[90vh] object-contain rounded-lg border-4 border-[var(--color-primary)] flex items-center justify-center"
              />
              <button
                className="absolute top-2 right-2 border-2 border-[var(--color-primary)] bg-white text-[var(--color-primary)] rounded-full w-8 h-8 flex justify-center items-center font-bold"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    />
  );
}
