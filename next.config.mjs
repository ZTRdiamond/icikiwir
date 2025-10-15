// next.config.mjs
let userConfig
try {
  userConfig = (await import('./new-user-next.config'))?.default
} catch (e) {
  // ignore
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(base, extra) {
  if (!extra) return
  for (const key of Object.keys(extra)) {
    if (typeof base[key] === 'object' && base[key] !== null && !Array.isArray(base[key])) {
      base[key] = { ...base[key], ...extra[key] }
    } else {
      base[key] = extra[key]
    }
  }
}

export default nextConfig
