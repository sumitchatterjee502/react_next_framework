/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://kycadmin.sudipchatterjee.com/public',
  },
}

module.exports = nextConfig
