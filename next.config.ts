import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 他の設定オプション */

  webpack: (config) => {
    // `child_process` と `fs` モジュールを無効化
    config.resolve.fallback = {
      ...config.resolve.fallback,
      child_process: false,
      fs: false,
    };
    return config;
  },
};

export default withPayload(nextConfig);
