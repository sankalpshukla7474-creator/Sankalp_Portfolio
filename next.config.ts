import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repositoryName = "Sankalp_Portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? `/${repositoryName}` : undefined,
  assetPrefix: isGithubPages ? `/${repositoryName}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repositoryName}` : "",
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
