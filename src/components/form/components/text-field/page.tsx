"use client";

import { useRef, useState } from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import { FormType } from "../../models/formtype";
import { Eye, EyeSlash } from "iconsax-react";

type Props = {
  name: string;
  isRequired?: boolean | null;
  control: Control<any>;
  placeholder?: string | null;
  type?: FormType;
  min?: string | number | undefined;
  rules?: RegisterOptions;
};

export default function TextField({
  name,
  control,
  placeholder,
  isRequired,
  type = FormType.TextField,
  min,
  rules,
}: Props) {
  const getType = () => {
    switch (type) {
      case FormType.DateTime:
        return "date";
      case FormType.PhoneNumber:
        return "tel";
      case FormType.Time:
        return "time";
      case FormType.Url:
        return "url";
      case FormType.Password:
        return "password";
      case FormType.Email:
        return "email";
      case FormType.Number:
        return "number";
      default:
        return "text";
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isShowPass, setIsShowPass] = useState(false);

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: isRequired ?? false,
        validate: (value, formValues) => {
          // Validasi URL
          if (type === FormType.Url) {
            if (/\s/.test(value)) return "URL tidak boleh mengandung spasi";
            // const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;
            // if (value && !urlPattern.test(value))
            //   return "Format URL tidak valid";
          }

          // Validasi nomor telepon
          if (type === FormType.PhoneNumber) {
            if (!/^[0-9]+$/.test(value))
              return "Nomor telepon hanya boleh berisi angka";
            if (value.length < 10 || value.length > 13)
              return "Nomor telepon harus 10–13 digit";
          }

          // Validasi email
          if (type === FormType.Email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailPattern.test(value))
              return "Format email tidak valid";
          }

          
          if (rules?.validate && typeof rules.validate === "function") {
            return rules.validate(value, formValues);
          }
          
          return true;
        },
      }}
      render={({ field }) => (
        <div className="border-gray-500 border-[1px] p-2 rounded-lg">
          {type === FormType.TextArea ? (
            <textarea
              rows={1}
              {...field}
              ref={(e) => {
                field.ref(e);
                textareaRef.current = e;
              }}
              onInput={handleInput}
              required
              placeholder={placeholder ?? ""}
              className="w-full focus:outline-none focus:ring-0 focus:border-transparent text-sm sm:text-base resize-none font-normal"
            />
          ) : (
            <div className="flex font-normal">
              <input
                {...field}
                type={isShowPass ? "text" : getType()}
                required
                min={min}
                placeholder={placeholder ?? ""}
                className="w-full focus:outline-none focus:ring-0 focus:border-transparent text-sm sm:text-base"
              />
              {type === FormType.Password && (
                <div
                  className="ml-2 cursor-pointer"
                  onClick={() => setIsShowPass(!isShowPass)}
                  role="button"
                >
                  {!isShowPass ? (
                    <Eye variant="Bold" size="24" color="grey" />
                  ) : (
                    <EyeSlash variant="Bold" size="24" color="grey" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
}
