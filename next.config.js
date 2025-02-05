/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  crossOrigin: 'anonymous',
  reactStrictMode: true, // Merge strict mode settings
  swcMinify: true,
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      })
    );
    return config;
  },
  env: {
    BASEURL: process.env.BASEURL,
  },
  images: {
    domains: [
      'mishmihills.encmp.xyz',
      'encamp-saas-bucket.s3.ap-south-1.amazonaws.com',
      'mishmihills.com',
      'localhost',
      'images.pexels.com',
      'i.pravatar.cc', // Add additional hostnames here
      'via.placeholder.com'
    ],
  },
};

module.exports = nextConfig;
