const path = require('path');

module.exports = {
  distDir: 'build',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/api/:path((?!auth).*)',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*` || 'http://localhost:2001/api/:path*',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};