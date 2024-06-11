/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ROOT_API: process.env.ROOT_API,
  },
  reactStrictMode: false,
};

export default nextConfig;
