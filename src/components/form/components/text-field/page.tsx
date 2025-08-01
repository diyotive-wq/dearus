import { useRef } from "react";
import { FormType } from "../../models/formtype";

export default function TextField({
  placeholder,
  name,
  type = FormType.TextField,
  value = '',
  onChange = () => {},
}: {
  placeholder?: string | null;
  type?: FormType;
  name?: string;
  value?: any;
  onChange?: (val: any) => void;
}) {
  const getType = () => {
    switch (type) {
      case FormType.DateTime:
        return "date";
      case FormType.Time:
        return "time";
      case FormType.Url:
        return "url";
      default:
        return "text";
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  return (
    <div className="border-gray-500 border-[1px] p-2 rounded-lg">
      {type === FormType.TextArea ? (
        <textarea
          rows={1}
          name={name}
          ref={textareaRef}
          onInput={handleInput}
          required={true}
          value={value}
          onChange={(e) => onChange(e.target.value)} // ✅ fix here
          placeholder={placeholder ?? ""}
          className="w-full focus:outline-none focus:ring-0 focus:border-transparent text-sm sm:text-base resize-none"
        />
      ) : (
        <input
          type={getType()}
          value={value}
          name={name}
          required={true}
          onChange={(e) => onChange(e.target.value)} // ✅ fix here
          placeholder={placeholder ?? ""}
          className="w-full focus:outline-none focus:ring-0 focus:border-transparent text-sm sm:text-base"
        />
      )}
    </div>
  );
}
