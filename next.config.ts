import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // GitHub Pages can only host a static export. Cache Components need a
  // Node server, so that mode stays on for local dev and turns off in CI.
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: "/Tarot_web",
        images: { unoptimized: true },
        env: { NEXT_PUBLIC_BASE_PATH: "/Tarot_web" },
      }
    : {
        cacheComponents: true,
        partialPrefetching: true,
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
