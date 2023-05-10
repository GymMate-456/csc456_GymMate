/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  // config
})

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
};