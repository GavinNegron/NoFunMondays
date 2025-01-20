module.exports = {
  distDir: 'build',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:2001/api/:path*',
      },
    ]
  },
}