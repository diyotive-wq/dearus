import { Couples } from "@/app/[slug]/models/couples";
import BloomBaseView from "../components/base-view";
import { Dancing_Script } from "next/font/google";
import ImageViewer from "@/components/image-viewer/page";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function BloomGalleryPage({ data }: { data?: Couples }) {
  return (
    <BloomBaseView backgroundColor={data?.color?.primary ?? ""}>
      <div className="p-8 min-h-screen w-full">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1
            className={`text-white text-2xl sm:text-3xl md:text-4xl ${dancing.className} mb-8`}
          >
            Gallery Of Us
          </h1>

          {
            !data?.gallery_image || data.gallery_image.length === 0 ? (
              <div></div>
            ) : (
              data.gallery_image.map((i, index) =>
                i ? (
                  <div key={index}>
                    <ImageViewer
                      color={data?.color?.primary}
                      key={index.toString()}
                      classname={
                        "w-full max-w-md md:max-w-2xl flex justify-center items-center"
                      }
                      height={1000}
                      width={1000}
                      classnameImage={
                        "rounded-xl shadow w-full h-auto object-cover"
                      }
                      src={i}
                      alt={`Gallery Image ${index + 1}`}
                    />
                    <div
                      className={`${
                        index === data!.gallery_image!.length - 1 ? "hidden" : ""
                      } mb-8`}
                    ></div>
                  </div>
                ) : null
              )
            )
          }
        </div>
      </div>
    </BloomBaseView>
  );
}
