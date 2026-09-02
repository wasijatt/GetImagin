/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Prevent TypeScript warnings/errors from blocking production builds on deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
