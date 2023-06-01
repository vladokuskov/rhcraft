/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains: ['rhcraft.s3.us-west-004.backblazeb2.com'],
  },
}

module.exports = nextConfig
