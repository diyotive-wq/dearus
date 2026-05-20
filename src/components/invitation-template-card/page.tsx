"use client";

import { InvitationTemplateModel } from "@/app/invitation-service/models/invitation-template-model";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function InvitationTemplateCard({ data }: { data?: InvitationTemplateModel }) {
  const router = useRouter();

  // Skeleton Loading State
  if (!data) {
    return (
      <div className="rounded-2xl w-full max-w-xs aspect-[3/4] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse shadow-sm" />
    );
  }

  // Siapkan custom CSS variables dari properti warna database
  const cardStyle = {
    "--bg-normal": data?.color?.tertiary || "#ffffff",
    "--bg-hover": data?.color?.secondary || "#f43f5e",
    "--border-normal": data?.color?.primary || "#e2e8f0",
    "--border-hover": data?.color?.secondary || "#f43f5e",
    "--text-normal": data?.color?.primary || "#1e293b",
    "--text-hover": "#ffffff",
    backgroundColor: "var(--bg-normal)",
    borderColor: "var(--border-normal)",
    color: "var(--text-normal)",
  } as React.CSSProperties;

  return (
    <div
      onClick={() => router.push(`/invitation-service/${data.id}`)}
      style={cardStyle}
      className="group flex flex-col border-2 rounded-2xl w-full max-w-xs aspect-[3/4] cursor-pointer overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl"
      // Handle dynamic hover menggunakan CSS variables yang sudah didefinisikan
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--bg-hover)";
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.color = "var(--text-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--bg-normal)";
        e.currentTarget.style.borderColor = "var(--border-normal)";
        e.currentTarget.style.color = "var(--text-normal)";
      }}
    >
      {/* Wadah Gambar / Thumbnail Template */}
      <div className="relative w-full h-4/5 overflow-hidden bg-gray-50">
        <Image
          src={data?.image_url ?? "/assets/placeholders/placeholder-image.png"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          alt={`${data?.title || "Template"} Preview`}
          sizes="(max-w-xs) 100vw"
        />
      </div>

      {/* Area Judul Template */}
      <div className="flex-1 flex items-center justify-center px-4 py-3">
        <h3 className="text-center text-sm sm:text-base font-bold tracking-wide uppercase transition-colors duration-300">
          {data?.title || "Bloom"}
        </h3>
      </div>
    </div>
  );
}