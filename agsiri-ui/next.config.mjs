/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: "http://localhost:3000/api",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
