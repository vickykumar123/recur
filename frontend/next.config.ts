import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  distDir: "out", // Default, but ensure this matches your Express configuration
};

export default nextConfig;
