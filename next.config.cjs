import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
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
      'i.pravatar.cc',
      'via.placeholder.com',
    ],
  },
};

export default nextConfig;
