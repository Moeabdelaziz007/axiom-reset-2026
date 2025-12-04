/** @type {import('next').NextConfig} */
const nextConfig = {
    // Static Export for Netlify deployment
    output: 'export',

    // Disable image optimization for static export
    images: {
        unoptimized: true,
    },

    // Trailing slashes for better static hosting
    trailingSlash: true,

    reactStrictMode: true,
};

module.exports = nextConfig;
