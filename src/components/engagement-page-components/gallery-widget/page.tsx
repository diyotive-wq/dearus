import Image from "next/image";
import { Couples } from "../../../app/[slug]/models/couples";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function GalleryWidget({ data }: { data: Couples }) {
  return (
    <div className="p-8 min-h-screen w-full" style={{background: data?.color?.primary}}>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1
          className={`text-white text-2xl sm:text-3xl md:text-4xl ${dancing.className} mb-8`}
        >
          Gallery Of Us
        </h1>

        {data.gallery_image.map((i, index) =>
          i ? (
            <div key={index}>
              <div
                key={index}
                className="w-full max-w-md md:max-w-2xl flex justify-center items-center"
              >
                <Image
                  src={i}
                  alt={`Gallery Image ${index + 1}`}
                  width={1000}
                  height={1000}
                  className="rounded-xl shadow w-full h-auto object-cover"
                />
              </div>
              <div
                className={`${
                  index === data.gallery_image.length - 1 ? "hidden" : ""
                } mb-8`}
              ></div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
