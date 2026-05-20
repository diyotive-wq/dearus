// form/components/FormField.tsx
"use client";

import TextField from "./text-field/page";
import SingleUploadForm from "./single-upload/page";
import { FormType } from "@/components/form/models/formtype";
import ColorSelection from "./color-selection/page";
import { Color } from "@/app/[slug]/models/couples";
import { Control, FieldValues, RegisterOptions, useController } from "react-hook-form";
import MultipleUploadForm from "./multiple-upload/page";

// Menggunakan Generics <TFieldValues> agar control fleksibel mengikuti tipe useForm induk
type FormFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: string;
  isRequired?: boolean | null;
  title?: string | null;
  placeholder?: string | null;
  formType: FormType;
  isSquare?: boolean;
  isCircle?: boolean;
  isCentered?: boolean;
  isPotrait?: boolean;
  fullWidth?: boolean;
  max_upload?: number | null;
  hintText?: string | null;
  itemsColor?: Color[] | null;
  min?: string | number | undefined;
  rules?: RegisterOptions<any, any>; // Melunakkan register options agar tidak bentrok dengan tipe nama spesifik
};

export default function FormField({
  control,
  name,
  isRequired,
  title,
  min,
  placeholder,
  formType,
  max_upload,
  isCentered,
  isSquare,
  isCircle,
  isPotrait,
  fullWidth,
  hintText,
  itemsColor,
  rules,
}: FormFieldProps<any>) {
  const {
    fieldState: { error },
  } = useController({ name, control });

  const renderField = () => {
    switch (formType) {
      case FormType.TextField:
      case FormType.DateTime:
      case FormType.Time:
      case FormType.TextArea:
      case FormType.Url:
      case FormType.Password:
      case FormType.Number:
      case FormType.PhoneNumber:
      case FormType.Email:
        return (
          <TextField
            name={name}
            min={min}
            isRequired={isRequired}
            control={control}
            rules={rules}
            placeholder={placeholder}
            type={formType}
          />
        );

      case FormType.SingleUpload:
        return (
          <SingleUploadForm
            name={name}
            control={control}
            placeholder={placeholder}
            isSquare={isSquare}
            isRequired={isRequired}
            isPotrait={isPotrait}
            isCircle={isCircle}
          />
        );

      case FormType.ColorSelection:
        return (
          <ColorSelection
            name={name}
            control={control}
            item={itemsColor}
            fullWidth={fullWidth}
            isRequired={isRequired}
          />
        );

      case FormType.MultipleUpload:
        return (
          <MultipleUploadForm
            name={name}
            control={control}
            maxFiles={max_upload}
            isRequired={isRequired}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col w-full ${
        isCentered ? "justify-center items-center" : ""
      }`}
    >
      {title && (
        <div className="mb-2 text-[var(--color-secondary)] font-bold text-xs sm:text-sm">
          {title}
        </div>
      )}

      {renderField()}

      {hintText && (
        <div className="text-[10px] text-gray-500 mt-1 sm:text-sm">
          {hintText}
        </div>
      )}

      {error && (
        <span className="text-red-500 text-xs mt-1">{error.message}</span>
      )}
    </div>
  );
}