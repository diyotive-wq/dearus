import { Dancing_Script } from "next/font/google";
import ImageViewer from "@/components/image-viewer/page";
import { DocumentationModel } from "../models/documentation-models";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default async function DocumentationServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Params di-await di Server Component
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-documentations/${decodedSlug}`, {
    method: "GET",
    cache: "no-store",
  });

  const { data }: { data: DocumentationModel } = await res.json();

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">
          Data dokumentasi tidak ditemukan 😢
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-[var(--color-primary-lightest)] min-h-screen pb-20">
      
      {/* HEADER */}
      <div className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark,rgb(219,39,119))] flex flex-col justify-center items-center pt-16 pb-16 px-4 sm:px-8 text-white text-center shadow-md">
        <span className="text-xs font-bold tracking-widest text-pink-100 uppercase mb-2 block">
          The Celebration of Love
        </span>
        <div className={`flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-3xl sm:text-4xl md:text-5xl font-bold ${dancing.className}`}>
          <h1>{data.male_bride}</h1>
          <span className="text-xl sm:text-2xl font-light text-pink-200/80">&</span>
          <h1>{data.female_bride}</h1>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-8 mt-12 flex flex-col gap-12">
        
        {/* VIDEO SECTION */}
        {data.video_url && (
          <div className="w-full flex flex-col items-center bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-100/70">
            <div className="text-center mb-6">
              <h1 className={`${dancing.className} text-2xl sm:text-3xl text-[var(--color-primary)] font-bold`}>
                Cinematic Memory
              </h1>
              <div className="w-8 h-0.5 bg-[var(--color-primary)] rounded-full mx-auto opacity-40 mt-1" />
            </div>
            <video
              src={data.video_url}
              controls
              className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-black"
            ></video>
          </div>
        )}

        {/* PHOTO GALLERY */}
        {data.photo_gallery?.length > 0 && (
          <div className="w-full flex flex-col items-center">
            <div className="text-center mb-8">
              <h1 className={`${dancing.className} text-2xl sm:text-3xl text-[var(--color-primary)] font-bold`}>
                Memory Captured
              </h1>
              <div className="w-8 h-0.5 bg-[var(--color-primary)] rounded-full mx-auto opacity-40 mt-1" />
            </div>
            
            {/* Grid 3 kolom yang rapi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
              {data.photo_gallery.map((url, index) =>
                url ? (
                  <div key={index} className="w-full aspect-square bg-white border border-gray-100 rounded-2xl p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <ImageViewer
                      color="var(--color-primary)"
                      classname="w-full h-full relative rounded-xl overflow-hidden"
                      classnameImage="object-cover"
                      src={url}
                      alt={`Gallery Image ${index + 1}`}
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}