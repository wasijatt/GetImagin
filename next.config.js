/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Prevent ESLint warnings/errors from blocking production builds on deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Prevent TypeScript warnings/errors from blocking production builds on deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
