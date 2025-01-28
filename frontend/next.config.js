module.exports = {
  distDir: 'build',
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_URL || 'http://localhost:2001/api/:path*',
      },
    ];
  },
  env: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST || '0.0.0.0',
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT || '3000',
  },
};