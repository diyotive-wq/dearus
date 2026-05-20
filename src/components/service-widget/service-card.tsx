import Image from "next/image";

type Props = {
  title: string;
  description: string;
  iconPath: string;
  onClick?: () => void;
};

export default function ServiceCard({
  iconPath,
  title,
  description,
  onClick,
}: Props) {
  return (
    <div
      className="group text-white w-full max-w-sm rounded-3xl bg-[var(--color-primary)] p-6 sm:p-8 cursor-pointer shadow-lg shadow-[var(--color-primary)]/10 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--color-primary)]/3xl hover:bg-[var(--color-primary-light)]"
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        {/* Kontainer Ikon dengan Efek Zoom Sedikit Saat Hover */}
        <div className="w-28 sm:w-36 md:w-40 relative aspect-square transition-transform duration-300 group-hover:scale-105">
          <Image
            src={iconPath}
            fill
            className="object-contain"
            alt={`${title} Icon`}
          />
        </div>

        <h3 className="text-lg sm:text-xl font-bold mt-6 text-center tracking-tight leading-snug">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-center mt-3 font-light text-pink-100/90 w-11/12 leading-relaxed group-hover:text-(--color-primary)">
          {description}
        </p>
      </div>
    </div>
  );
}
