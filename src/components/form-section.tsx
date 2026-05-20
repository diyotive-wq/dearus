"use client";

import { Couples } from "@/app/[slug]/models/couples";
import FormField from "./form/components/page";
import { FormType } from "./form/models/formtype";
import { useForm } from "./form/page";
import { Timestamp } from "firebase/firestore";

function combineDateAndTime(date: string, time: string): Timestamp | null {
  if (!date || !time) return null;
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return Timestamp.fromDate(new Date(year, month - 1, day, hour, minute));
}

export default function FormSection() {
  const { getValues } = useForm();
  const handleSubmit = () => {
    const values = getValues();

    const missingFields: string[] = [];

    Object.entries(values).forEach(([key, field]) => {
      const value = field.value;
      const isEmptyString = typeof value === "string" && value.trim() === "";
      const isEmptyFile = value instanceof File && value.size === 0;
      const isNullOrUndefined = value === null || value === undefined;

      const isEmptyObject =
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        !(value instanceof File) &&
        Object.keys(value).length === 0;

      if (isEmptyString || isEmptyFile || isNullOrUndefined || isEmptyObject) {
        missingFields.push(field.title);
      }
    });
    
    if (missingFields.length > 0) {
      alert(`Please fill all fields:\n${missingFields.join("\n")}`);
      return;
    }

    const rawValues = Object.fromEntries(
      Object.entries(values).map(([key, field]) => [key, field.value])
    );

    const { engagementDate, engagementTime, gallery1, gallery2, ...rest } =
      rawValues;

    const coupleTemp: Couples = {
      ...(rest as Omit<Couples, "date" | "gallery_image">),
      date: combineDateAndTime(engagementDate, engagementTime)!,
      gallery_image: [gallery1, gallery2].filter(Boolean),
    };

    const finalOutput = {
      data: coupleTemp,
      _firstTime: true,
    };

    console.log(finalOutput);

    localStorage.setItem("data", JSON.stringify(finalOutput));
    window.open("/preview", "_blank");
  };

  return (
    <section>
      <div className="w-screen bg-[var(--color-primary)] py-8 px-6 sm:p-8 flex flex-col items-center">
        <div className="font-bold text-2xl sm:text-3xl text-white mb-3">
          Let's Get Started
        </div>
        <div className="w-full sm:w-3/5 rounded-2xl p-4 sm:p-6 bg-white flex flex-col gap-4">
          <FormField
            name="header_image"
            // title="Input heading Picture"
            isCircle={true}
            isCentered={true}
            formType={FormType.SingleUpload}
          />
          {/* <FormField
            name="header_image_potrait"
            title="Input heading Picture (Mobile View)"
            placeholder={"Input heading Picture (9:16)"}
            isPotrait={true}
            formType={FormType.SingleUpload}
          /> */}
          <FormField
            name="introduction_title"
            title="Input Introduction Title"
            placeholder={"Input Introduction Title"}
            formType={FormType.TextField}
          />
          <FormField
            name="male_bride"
            title="Male Bride Name"
            formType={FormType.TextField}
            placeholder="Input Male Bride Name"
          />
          <FormField
            name="female_bride"
            title="Female Bride Name"
            formType={FormType.TextField}
            placeholder="Input Female Bride Name"
          />
          <FormField
            name="engagementDate"
            title="Engagement Date"
            formType={FormType.DateTime}
            placeholder="Input Date"
          />
          <FormField
            name="engagementTime"
            title="Engagement Time"
            formType={FormType.Time}
            placeholder="Input Time"
          />
          <FormField
            name="address"
            title="Address"
            formType={FormType.TextArea}
            placeholder="Input Address"
          />
          <FormField
            name="link_maps"
            title="Link Maps"
            formType={FormType.Url}
            placeholder="Input Url Maps"
            hintText="ex. https://maps.app.goo.gl/DwfXGVC4HBgPnEhC7"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              name="gallery1"
              title="Gallery Picture 1"
              placeholder={"Input Gallery Picture 1"}
              formType={FormType.SingleUpload}
              isSquare={true}
            />
            <FormField
              name="gallery2"
              title="Gallery Picture 2"
              placeholder={"Input Gallery Picture 2"}
              formType={FormType.SingleUpload}
              isSquare={true}
            />
          </div>
          <FormField
            name="color"
            title="Select Theme Color"
            placeholder={"Input Gallery Picture 3"}
            formType={FormType.ColorSelection}
            itemsColor={[
              {
                theme: "Pink",
                primary: "#EA476A",
                secondary: "#FFB9BC",
                tertiary: "#FFEBEC",
              },
              {
                theme: "Blue",
                primary: "#00A3E3",
                secondary: "#89DEFF",
                tertiary: "#B8EBFF",
              },
            ]}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-[var(--color-primary)] text-white p-2 font-bold mt-3 cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
}
