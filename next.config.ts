import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/amazon",
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
