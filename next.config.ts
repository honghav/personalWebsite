import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev', // This allows any R2 public bucket URL
      },
    ],
    // Note: If you use simple <img> tags, you don't need this config.
    // This is only for the optimized next/image component.
  },
};

export default nextConfig;
