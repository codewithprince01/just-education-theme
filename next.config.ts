import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      // Tags moved from /blog/tag/<slug> to the clean /blog/<slug> path.
      { source: "/blog/tag/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
