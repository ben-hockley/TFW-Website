import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",   // Enables `next build` static export (outputs to /out)
  trailingSlash: true, // Required for GitLab Pages static hosting
};

export default nextConfig;
