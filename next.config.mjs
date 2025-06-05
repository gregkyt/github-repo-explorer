/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const repoName = "github-repo-explorer";
const nextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_SERVICE_BASE_URL: process.env.NEXT_PUBLIC_SERVICE_BASE_URL,
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    NEXT_PUBLIC_GITHUB_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
  },
  reactStrictMode: false,
};

export default nextConfig;
