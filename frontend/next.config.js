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
    const redirects = [];
  
    if (process.env.NEXTAUTH_API) {
      redirects.push({
        source: '/api/auth/:path*',
        destination: `${process.env.NEXTAUTH_API}/api/auth/:path*`,
        permanent: true,
      });
    }
  
    redirects.push({
      source: '/api/:path((?!auth).*)',
      destination: 'http://localhost:2001/api/:path*',
      permanent: true,
    });
  
    return redirects;
  }
,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};