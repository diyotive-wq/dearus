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
    <div className="w-full max-w-4xl flex flex-col items-center">
      {/* Header Nama Template */}
      <div className="text-center mb-6 animate-fade-in">
        <h1 className={`${dancing.className} text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-md`}>
          {data?.template_name} Template
        </h1>
        <div className="w-12 h-0.5 bg-white rounded-full mx-auto opacity-40 mt-3" />
      </div>

      {/* Main Container Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-white/10 flex flex-col gap-6"
      >
        {/* Pembagian Grid Layout untuk Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 w-full">
          {data?.form?.map((form, index) => {
            // Evaluasi lebar field (Full-Width khusus untuk Upload, Alamat, dan Color Selection)
            const isFullWidth = 
              form.input_type === "single_upload" || 
              form.input_type === "multiple_upload" || 
              form.input_type === "color_selection_input" ||
              form.name?.includes("address") ||
              form.name?.includes("maps");

            const fieldContent = (() => {
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
                  <ColorSelectionWrapper key={index}>
                    <FormField
                      name={form.name!}
                      formType={FormType.ColorSelection}
                      title={form.title}
                      itemsColor={form.color_options}
                      placeholder={form.hint_text}
                      control={control}
                    />
                  </ColorSelectionWrapper>
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
            })();

            return (
              <div 
                key={index} 
                className={`${isFullWidth ? "md:col-span-2" : "col-span-1"} flex flex-col w-full`}
              >
                {fieldContent}
              </div>
            );
          })}
        </div>

        {/* Tombol Aksi Cetak Utama */}
        <div className="w-full flex justify-center mt-6 border-t border-gray-100 pt-6">
          <button
            type="submit"
            className="w-full sm:w-1/3 bg-[var(--color-primary)] text-white font-bold py-3.5 px-8 rounded-2xl tracking-wide shadow-lg shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-light)] hover:shadow-xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none cursor-pointer text-center text-sm sm:text-base"
          >
            Generate Preview
          </button>
        </div>
      </form>
    </div>
  );
}

// Komponen mini pembungkus dekoratif agar letak Color Pilihan lebih estetis
function ColorSelectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 sm:p-5 w-full mt-2">
      {children}
    </div>
  );
}