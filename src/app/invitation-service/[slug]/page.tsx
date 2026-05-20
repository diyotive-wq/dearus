// "use client";

import TemplatePageWidget from "@/components/template-page/template-page-widget";

export default async function InvitationDetail({
  params,
}: {
  params: { slug: string };
}) {

  const {slug} = await params;

  const decodedSlug = decodeURIComponent(slug);

  // ✅ Ambil data Firestore lewat API (bukan server action)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-templates/${decodedSlug}`, {
    method: "GET",
    // 🚨 Supaya tidak di-cache oleh Next.js di sisi server
    cache: "no-store",
  });

  const { data } = await res.json();
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

  // ✅ Render TemplatePageWidget sebagai output utama
  return <TemplatePageWidget data={data} />;
}
