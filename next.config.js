const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\/teacher/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "teacher-profiles",
        expiration: { maxAgeSeconds: 60 * 60 * 24, maxEntries: 80 }
      }
    },
    {
      urlPattern: /^https:\/\/.*\/api\//,
      handler: "NetworkFirst",
      options: { cacheName: "api-cache", networkTimeoutSeconds: 8 }
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp|avif)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-images",
        expiration: { maxAgeSeconds: 60 * 60 * 24 * 30, maxEntries: 120 }
      }
    }
  ]
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=(self)"
          }
        ]
      }
    ];
  }
};

module.exports = withPWA(nextConfig);
