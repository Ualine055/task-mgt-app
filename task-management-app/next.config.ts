import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Force the workspace root to this project so .env.local is loaded from here
    root: __dirname,
  },
};

export default nextConfig;
