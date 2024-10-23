/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'**',
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/url/:path*',
        destination: `https://assignment-todolist-api.vercel.app/api/:path*`,
        // permanent: true,
      },
    ]
  },

};

export default nextConfig;
