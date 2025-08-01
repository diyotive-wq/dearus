import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ['picsum.photos', 'firebasestorage.googleapis.com'],
  },
  // ...config lain jika ada
};

export default nextConfig;
