"use client";

export default function CustomButton({ title }: { title: string }) {
  return (
    <button
      onClick={() => window.open("https://wa.me/628112518692", "_blank")}
      className="inline-block w-fit text-xs sm:text-sm text-white font-semibold rounded-full bg-[var(--color-primary)] px-6 py-3 sm:px-8 sm:py-3.5 shadow-md shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-dark,rgb(219,39,119))] hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none"
    >
      {title}
    </button>
  );
}