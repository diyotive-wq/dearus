'use client';

import Image from "next/image";
import Navbar from "@/components/navbar/page";
import { FormType } from "@/components/form/models/formtype";
import { FormProvider } from "@/components/form/page";
import FormSection from "@/components/form-section";

export default function Home() {
  return (
    <div className="flex flex-col w-screen">
      <Navbar />

      {/* Section 1: Landing Page */}
      <section>
        <div className="w-full flex p-8 justify-between flex-col gap-6 sm:flex-row">
          <div className="w-full flex flex-col justify-center sm:w-1/2">
            <div className="text-xl md:text-3xl lg:text-4xl font-semibold text-[var(--color-primary)]">
              Welcome to Dear Us
            </div>
            <div className="text-[16px] md:text-xl lg:text-3xl font-normal text-[var(--color-primary)] mt-2 sm:mt-4">
              Create Beautiful Digital Engagement Invitations In Minutes, Not Days
            </div>
            <div className="text-xs md:text-sm lg:text-xl font-light mt-4 sm:mt-6 text-justify text-[var(--color-secondary)]">
              You’re about to begin a new chapter in life, and every chapter
              deserves a beautiful beginning. At Dear Us, we help you capture
              the magic of your engagement with stunning digital invitations
              that are easy to create, personalize, and share. Whether you’re
              celebrating intimately or inviting the whole family, your
              invitation should reflect your love story, and now, it can.
            </div>
          </div>
          <div className="w-3/4 sm:w-2/5 relative aspect-[1/1] mx-auto">
            <Image
              src={"/assets/icons/landing_images.png"}
              fill
              alt="Landing Page"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Form (Wrapped in FormProvider) */}
      <FormProvider>
        <FormSection />
      </FormProvider>
    </div>
  );
}
