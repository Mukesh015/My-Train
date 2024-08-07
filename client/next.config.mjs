/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
  experimental:{
    missingSuspenseWithCSRBailout:false
  }
};

export default nextConfig;
