/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optimize for Vercel serverless functions
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // Environment variable validation (optional but recommended)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
}

module.exports = nextConfig
