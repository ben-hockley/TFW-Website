import type { NextConfig } from "next";

// When deployed to GitHub Pages the site lives at /<repo-name>/
// The configure-pages action sets GITHUB_PAGES=true in $GITHUB_ENV so that
// subsequent build steps can detect this and apply the correct basePath.
// GITHUB_REPOSITORY is "owner/repo", so we split to get just the repo name.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath =
  process.env.GITHUB_PAGES === "true" && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",   // Enables `next build` static export (outputs to /out)
  trailingSlash: true, // Required for GitHub Pages static hosting
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
