/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['s3.eu-north-1.amazonaws.com'],
    },
};

const withNextIntl = require("next-intl/plugin")(
    "./src/next-i18next.config.js"
);

module.exports = withNextIntl(nextConfig);
