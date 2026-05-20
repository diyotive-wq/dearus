'use client';

import { Couples } from "@/app/[slug]/models/couples";
import { TemplateDetailModel } from "@/app/invitation-service/models/template-detail-model";
import { Timestamp } from "firebase/firestore";
import { Dancing_Script } from "next/font/google";
import { useForm } from "react-hook-form";
import FormField from "./components/page";
import { FormType } from "./models/formtype";

// import { createContext, useContext, useState } from 'react';

// type FormField = {
//   value: any;
//   errors: string | null;
//   title: string;
// };

// type FormState = Record<string, FormField>;

// interface FormContextType {
//   values: FormState;
//   setFieldValue: (key: string, value: any) => void;
//   setFieldTitle: (key: string, title: string) => void;
//   setFieldError: (key: string, error: string | null) => void;
//   getValues: () => FormState;
//   getRawValues: () => Record<string, any>;
// }

// const FormContext = createContext<FormContextType | null>(null);

// export const useForm = () => {
//   const ctx = useContext(FormContext);
//   if (!ctx) throw new Error('useForm must be used inside a <FormProvider>');
//   return ctx;
// };

// export const FormProvider = ({ children }: { children: React.ReactNode }) => {
//   const [values, setValues] = useState<FormState>({});

//   const setFieldValue = (key: string, value: any) => {
//     setValues((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         value,
//       },
//     }));
//   };

//   const setFieldTitle = (key: string, title: string) => {
//     setValues((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         title,
//       },
//     }));
//   };

//   const setFieldError = (key: string, error: string | null) => {
//     setValues((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         errors: error,
//       },
//     }));
//   };

//   const getValues = () => values;

//   const getRawValues = () => {
//     const result: Record<string, any> = {};
//     Object.entries(values).forEach(([key, field]) => {
//       result[key] = field.value;
//     });
//     return result;
//   };

//   return (
//     <FormContext.Provider
//       value={{
//         values,
//         setFieldValue,
//         setFieldTitle,
//         setFieldError,
//         getValues,
//         getRawValues,
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

function combineDateAndTime(date: string, time: string): Timestamp | null {
  if (!date || !time) return null;
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return Timestamp.fromDate(new Date(year, month - 1, day, hour, minute));
}

export default function FormWidget({
  data,
}: {
  data: TemplateDetailModel | null;
}) {
  const { handleSubmit, control } = useForm();

  const onSubmit = (formData: any) => {
    const { engagement_date, engagement_time, gallery_image, ...rest } =
      formData;

    const coupleTemp: Couples = {
      ...(rest as Omit<Couples, "date" | "gallery_image">),
      date: combineDateAndTime(engagement_date, engagement_time)!,
      gallery_image: gallery_image || [], // langsung ambil array hasil multiple upload
    };

    const finalOutput = {
      data: coupleTemp,
      _firstTime: true,
    };

    localStorage.setItem("data", JSON.stringify(finalOutput));
    window.open("/preview", "_blank");
  };

  return (
    <div className="p-8 flex flex-col bg-[var(--color-primary)] items-center justify-center">
      <h1
        className={`${dancing.className} text-xl sm:text-2xl md:text-4xl font-bold mb-4 text-white`}
      >
        {data?.template_name} Template
      </h1>
      <div className="m-1 sm:m-4"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 flex flex-col w-full sm:w-3/4 rounded-4xl items-center justify-center gap-4"
      >
        {data?.form?.map((form, index) => {
          if (form.input_type === "single_upload") {
            return (
              <FormField
                key={index}
                name={form.name!}
                formType={FormType.SingleUpload}
                title={form.title}
                isCentered
                isCircle={form.upload_form === "circle"}
                placeholder={form.hint_text}
                control={control}
              />
            );
          }
          if (form.input_type === "time_input") {
            return (
              <FormField
                key={index}
                name={form.name!}
                formType={FormType.Time}
                title={form.title}
                placeholder={form.hint_text}
                control={control}
              />
            );
          }
          if (form.input_type === "date_input") {
            return (
              <FormField
                key={index}
                name={form.name!}
                min={new Date().toISOString().split("T")[0]}
                formType={FormType.DateTime}
                title={form.title}
                placeholder={form.hint_text}
                control={control}
              />
            );
          }
          if (form.input_type === "color_selection_input") {
            return (
              <FormField
                key={index}
                name={form.name!}
                formType={FormType.ColorSelection}
                title={form.title}
                itemsColor={form.color_options}
                placeholder={form.hint_text}
                control={control}
              />
            );
          }
          if (form.input_type === "multiple_upload") {
            return (
              <FormField
                key={index}
                name={form.name!}
                formType={FormType.MultipleUpload}
                title={form.title}
                max_upload={form.max_upload}
                itemsColor={form.color_options}
                placeholder={form.hint_text}
                control={control}
              />
            );
          }
          return (
            <FormField
              key={index}
              name={form.name!}
              formType={FormType.TextField}
              title={form.title}
              placeholder={form.hint_text}
              control={control}
            />
          );
        })}

        <button
          type="submit"
          className="mt-6 bg-[var(--color-primary)] text-white font-semibold px-6 py-2 rounded-lg cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
