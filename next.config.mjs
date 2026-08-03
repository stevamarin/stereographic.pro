/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
]

// Long cache for static media under public/ — these files change rarely.
// NOTE: if you replace one of these files, rename it (or bump a suffix) so
// returning visitors don't keep the old cached copy for up to 30 days.
const mediaCacheHeader = {
  key: "Cache-Control",
  value: "public, max-age=2592000, stale-while-revalidate=86400",
}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only honours `quality` values listed here; anything else
    // silently falls back to 75. 90 is used by the hero logo, whose smooth
    // gradient bands at the default.
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      { source: "/background.webm", headers: [mediaCacheHeader] },
      { source: "/background-poster.webp", headers: [mediaCacheHeader] },
      { source: "/services/:path*", headers: [mediaCacheHeader] },
      { source: "/logos/:path*", headers: [mediaCacheHeader] },
      { source: "/icons/:path*", headers: [mediaCacheHeader] },
      { source: "/work-thumbnails/:path*", headers: [mediaCacheHeader] },
    ]
  },
}

export default nextConfig
