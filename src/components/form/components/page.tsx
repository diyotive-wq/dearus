// form/components/FormField.tsx
"use client";

import { useEffect } from "react";
import TextField from "./text-field/page";
import SingleUploadForm from "./single-upload/page";
import { FormType } from "@/components/form/models/formtype";
import { useForm } from "../page";
import ColorSelection from "./color-selection/page";
import { Color } from "@/app/[slug]/models/couples";

type FormFieldProps = {
  name: string;
  title?: string | null;
  placeholder?: string | null;
  formType: FormType;
  isSquare?: boolean;
  isPotrait?: boolean;
  hintText?: string | null;
  itemsColor?: Color[] | null;
};

export default function FormField({
  name,
  title,
  placeholder,
  formType,
  isSquare,
  isPotrait,
  hintText,
  itemsColor,
}: FormFieldProps) {
  const { values, setFieldValue } = useForm();
  const rawValue = values[name];

  // 🧠 Inisialisasi nilai default jika belum ada
  useEffect(() => {
    if (!(name in values)) {
      let defaultValue: any;
      switch (formType) {
        case FormType.TextField:
        case FormType.DateTime:
        case FormType.Time:
        case FormType.TextArea:
        case FormType.Url:
          defaultValue = "";
          break;
        case FormType.ColorSelection:
          defaultValue = null;
          break;
        case FormType.SingleUpload:
          defaultValue = null;
          break;
        default:
          defaultValue = "";
      }
      setFieldValue(name, defaultValue);
    }
  }, [name, formType, values, setFieldValue]);

  // 🛡️ Value Sanitization
  const value =
    typeof rawValue === "string" || rawValue === undefined || rawValue === null
      ? rawValue || ""
      : formType === FormType.SingleUpload || formType === FormType.ColorSelection
      ? rawValue
      : "";

  const handleChange = (val: any) => {
    setFieldValue(name, val);
  };

  const renderField = () => {
    switch (formType) {
      case FormType.TextField:
      case FormType.DateTime:
      case FormType.Time:
      case FormType.TextArea:
      case FormType.Url:
        return (
          <TextField
            name={name}
            placeholder={placeholder}
            type={formType}
            value={value}
            onChange={handleChange}
          />
        );

      case FormType.SingleUpload:
        return (
          <SingleUploadForm
            placeholder={placeholder}
            isSquare={isSquare}
            isPotrait={isPotrait}
            value={value}
            onChange={handleChange}
          />
        );

      case FormType.ColorSelection:
        return (
          <ColorSelection
            item={itemsColor}
            value={value}
            onChange={handleChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {title && (
        <div className="mb-2 text-[var(--color-secondary)] font-bold text-xs sm:text-sm md:text-base">
          {title}
        </div>
      )}
      {renderField()}
      {hintText && (
        <div className="text-[10px] text-gray-500 mt-1 sm:text-sm">
          {hintText}
        </div>
      )}
    </div>
  );
}
