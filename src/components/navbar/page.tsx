"use client";

import getClientSession from "@/hooks/getClientSession";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Memperbaiki Infinite Loop pada Cek Session
  useEffect(() => {
    getClientSession().then((session) => {
      setIsAuthenticated(!!session);
    });
  }, []); // Cukup jalankan sekali saat komponen pertama kali dipasang (mount)

  // 2. Efek Navbar blur/shadow saat discroll agar lebih estetik
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 "
          : "bg-transparent "
      }`}
    >
      <div className="flex py-4 px-4 justify-between items-center">
        
        {/* Kiri: Logo */}
        <div 
          className="relative w-24 sm:w-28 md:w-32 aspect-[16/4.5] cursor-pointer transition-transform active:scale-95"
          onClick={() => router.push("/")}
        >
          <Image 
            src="/assets/icons/logo.svg" 
            alt="Dear Us Logo" 
            fill 
            className="object-contain"
            priority 
          />
        </div>

        {/* Kanan: Tombol Aksi */}
        <div>
          {!isAuthenticated ? (
            /* Tombol Login yang Lebih Modern dengan Efek Hover & Shadow */
            <button
              onClick={() => router.push("/login")}
              className="cursor-pointer rounded-full bg-[var(--color-primary)] text-white px-5 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-light)] hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Login
            </button>
          ) : (
            /* Avatar Profile dengan Efek Ring Border */
            <button
              onClick={() => router.push("/profile")}
              className="cursor-pointer relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-[var(--color-primary)] p-0.5 transition-all duration-300 focus:outline-none group active:scale-95"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                <Image
                  src="/assets/icons/user.png"
                  alt="User Profile"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}