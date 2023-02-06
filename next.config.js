/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pngimg.com', 'fakestoreapi.com'],
  },
  env: {
    stripe_public_key: process.env.REACT_APP_STRIPE_PKEY,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
