/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        apiBaseUrl: process.env.API_BASE_URL,
    }
}

module.exports = nextConfig
