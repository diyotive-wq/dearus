// "use client";

import FormWidget from "@/components/form/page";

export default async function FormTemplatePage({
  params,
}: {
  params: { slug: string };
}) {
  const {slug} = await params;

  const decodedSlug = decodeURIComponent(slug);

  // ✅ Ambil data lewat API, bukan langsung Firestore
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-templates/${decodedSlug}`, {
    method: "GET",
    cache: "no-store", // biar selalu ambil fresh data
  });

  if (!res.ok) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          Failed to load template
        </h1>
        <p className="text-gray-500 text-sm">
          Server responded with status {res.status}.
        </p>
      </div>
    );
  }

  const { data } = await res.json();

  // ✅ Tambahkan fallback jika data tidak ditemukan
  if (!data) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">
          Template not found
        </h1>
        <p className="text-gray-500 text-sm">
          Please check your template URL or try again later.
        </p>
      </div>
    );
  }

  // ✅ Render FormWidget (client component)
  return (
    <FormWidget data={data} />
    // <div className="p-8 flex flex-col bg-[var(--color-primary)] items-center justify-center">
    //   <h1
    //     className={`${dancing.className} text-xl sm:text-2xl md:text-4xl font-bold mb-4 text-white`}
    //   >
    //     {data?.template_name} Template
    //   </h1>
    //   <div className="m-1 sm:m-4"></div>
    //   <form
    //     onSubmit={handleSubmit(onSubmit)}
    //     className="bg-white p-8 flex flex-col w-full sm:w-3/4 rounded-4xl items-center justify-center gap-4"
    //   >
    //     {/* 🧩 Loop form field */}
    //     {data?.form?.map((form, index) => {
    //       if (form.input_type === "single_upload") {
    //         return (
    //           <FormField
    //             key={index}
    //             name={form.name!}
    //             formType={FormType.SingleUpload}
    //             title={form.title}
    //             isCentered
    //             isCircle={form.upload_form === "circle"}
    //             placeholder={form.hint_text}
    //             control={control}
    //           />
    //         );
    //       }
    //       if (form.input_type === "time_input") {
    //         return (
    //           <FormField
    //             key={index}
    //             name={form.name!}
    //             formType={FormType.Time}
    //             title={form.title}
    //             placeholder={form.hint_text}
    //             control={control}
    //           />
    //         );
    //       }
    //       if (form.input_type === "date_input") {
    //         return (
    //           <FormField
    //             key={index}
    //             name={form.name!}
    //             formType={FormType.DateTime}
    //             title={form.title}
    //             placeholder={form.hint_text}
    //             control={control}
    //           />
    //         );
    //       }
    //       if (form.input_type === "color_selection_input") {
    //         return (
    //           <FormField
    //             key={index}
    //             name={form.name!}
    //             formType={FormType.ColorSelection}
    //             title={form.title}
    //             itemsColor={form.color_options}
    //             placeholder={form.hint_text}
    //             control={control}
    //           />
    //         );
    //       }
    //       if (form.input_type === "multiple_upload") {
    //         return (
    //           <FormField
    //             key={index}
    //             name={form.name!}
    //             formType={FormType.MultipleUpload}
    //             title={form.title}
    //             itemsColor={form.color_options}
    //             placeholder={form.hint_text}
    //             control={control}
    //           />
    //         );
    //       }
    //       return (
    //         <FormField
    //           key={index}
    //           name={form.name!}
    //           formType={FormType.TextField}
    //           title={form.title}
    //           placeholder={form.hint_text}
    //           control={control}
    //         />
    //       );
    //     })}
    //     <button
    //       type="submit"
    //       className="mt-6 bg-[var(--color-primary)] text-white font-semibold px-6 py-2 rounded-lg"
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
}
