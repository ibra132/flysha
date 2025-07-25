import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },

  images: {
    domains: ["uqsynqeexvsuqfrcshar.supabase.co"],
  },
};

export default nextConfig;
