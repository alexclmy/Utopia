import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@utopia/domain", "@utopia/city-rules"],
  experimental: {
    optimizePackageImports: ["lucide-react"]
  }
};

export default nextConfig;
