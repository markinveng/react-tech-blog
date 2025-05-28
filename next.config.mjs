import path from "path";
import { fileURLToPath } from "url";

// __dirname の代替定義（ESM用）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.microcms-assets.io"],
  },

  // GLSL loader
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      use: "raw-loader",
      exclude: /node_modules/,
    });
    return config;
  },

  // SCSS @use "@/..." エイリアス用設定
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
};

export default nextConfig;
