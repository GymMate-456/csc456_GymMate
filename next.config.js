/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  // config
  reactStrictMode: false,
})

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: false,
};