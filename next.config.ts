import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['camo.githubusercontent.com', 'media.licdn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'camo.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
