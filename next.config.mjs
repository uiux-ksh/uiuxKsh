/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smailgate-photo.vercel.app',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
