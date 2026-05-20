"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import ServiceCard from "@/components/service-widget/service-card";
import { useEffect } from "react";
import { decrypt } from "@/hooks/crypto";

const dancing = Dancing_Script({
  variable: "--font-script",
  weight: ["700"],
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.removeItem("documentation-page");
    sessionStorage.removeItem("invitation-page");
    const storedEncrypted = localStorage.getItem("data");

    if (storedEncrypted) {
      try {
        const decrypted = decrypt(storedEncrypted);
        const parsed = JSON.parse(decrypted);

        const isSameDay =
          new Date(parsed.exp).toDateString() === new Date().toDateString();

        if (isSameDay) {
          localStorage.removeItem("data");
        }
      } catch (e) {
        console.error("Decryption error:", e);
        localStorage.removeItem("data");
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-white to-[var(--color-primary-light)]/20">
      
      {/* Section 1: Hero Section */}
      <section className="relative overflow-hidden">
        {/* Dekorasi background abstrak lembut */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-light)] rounded-full filter blur-3xl opacity-30 -z-10 translate-x-1/3 -translate-y-1/3" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 pt-24 pb-16 px-6 sm:px-12 lg:px-16">
          
          {/* Sisi Kiri: Teks */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <span className="text-xs md:text-sm font-bold tracking-widest text-[var(--color-primary)] uppercase mb-2 block">
               there's a story in every love
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-9xl leading-tight tracking-tight">
              Welcome to <span className="text-[var(--color-primary)]">Dear Us</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-700 mt-4 leading-relaxed max-w-xl mx-auto md:mx-0">
              Beautiful Engagement Invitations & Timeless Documentation in One Place
            </p>
            <p className="text-xs sm:text-sm lg:text-base font-normal mt-4 text-gray-500 max-w-md mx-auto md:mx-0 leading-relaxed">
              You’re about to begin a new chapter in life, and every chapter
              deserves to be remembered beautifully...
            </p>
          </div>

          {/* Sisi Kanan: Gambar */}
          <div className="w-full sm:w-4/5 md:w-1/2 flex justify-center">
            <div className="relative w-full aspect-[4/3] max-w-lg drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src={"/assets/icons/landing_images_2.png"}
                fill
                className="object-contain"
                alt="Landing Page Showcase"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Services Section */}
      <section className="bg-gradient-to-b from-[var(--color-primary-light)]/40 to-[var(--color-primary-light)]/70 py-16 px-6 sm:px-12 lg:px-16 relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          <div className="text-center mb-12">
            <h2 className={`${dancing.className} text-3xl md:text-4xl lg:text-5xl text-[var(--color-primary)] mb-2`}>
              Our Service
            </h2>
            <div className="w-12 h-1 bg-[var(--color-primary)] rounded-full mx-auto opacity-60"></div>
          </div>

          {/* Grid Layout: Berjejer ke samping di desktop, menumpuk di mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl justify-items-center">
            <ServiceCard
              onClick={() => router.push("/invitation-service")}
              iconPath="/assets/icons/invitation.png"
              title="Engagement Digital Invitation"
              description="Create personalized engagement invitations instantly..."
            />

            <ServiceCard
              onClick={() => router.push("/documentation-service")}
              iconPath="/assets/icons/documentation.png"
              title="Engagement Documentation"
              description="Capture every smile, glance, and moment..."
            />
          </div>
        </div>
      </section>
    </div>
  );
}