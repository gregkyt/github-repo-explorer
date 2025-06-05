/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const repoName = "github-repo-explorer";
const nextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  env: {
    BASE_URL: isProd ? process.env.NEXT_PUBLIC_BASE_URL : process.env.BASE_URL,
    SERVICE_BASE_URL: isProd
      ? process.env.NEXT_PUBLIC_SERVICE_BASE_URL
      : process.env.SERVICE_BASE_URL,
    GITHUB_CLIENT_ID: isProd
      ? process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
      : process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: isProd
      ? process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET
      : process.env.GITHUB_CLIENT_SECRET,
  },
  reactStrictMode: false,
};

export default nextConfig;
