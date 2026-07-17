import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
});

// Le plugin Serwist injecte une config webpack, incompatible avec
// Turbopack (actif par defaut en dev sur Next 16). On ne l'applique
// donc qu'au build de production, ou npm run build force deja
// `next build --webpack`.
export default process.env.NODE_ENV === "development"
  ? nextConfig
  : withSerwist(nextConfig);
