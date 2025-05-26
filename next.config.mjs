/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/typedef
const nextConfig = {
  images: {
    domains: ["images.microcms-assets.io"],
  },

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: 'raw-loader',
      exclude: /node_modules/,
    });
    return config;
  },
};

export default nextConfig;