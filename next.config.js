/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Use remotePatterns for specific domains and protocols
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '', // Keep empty if no port is specified
      },
      {
        protocol: 'https',
        hostname: 'backend-4c5c.onrender.com', // Add your backend URL here if needed
      },
    ],
    // Use domains for local development domains
    domains: [
      'localhost',
      '127.0.0.1',
    ],
  },
};

module.exports = nextConfig;
