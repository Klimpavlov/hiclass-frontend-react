/** @type {import('next').NextConfig} */

// const nextConfig = {};
//
// const withNextIntl = require("next-intl/plugin")(
//     // This is the default (also the `src` folder is supported out of the box)
//     "./next-i18next.config.js"
// );
//
// module.exports = withNextIntl(nextConfig);
//
//
// module.exports = {
//     images: {
//         domains: ['s3.eu-north-1.amazonaws.com'],
//     },
// }


const nextConfig = {
    images: {
        domains: ['s3.eu-north-1.amazonaws.com'],
    },
};

const withNextIntl = require("next-intl/plugin")(
    // This is the default (also the `src` folder is supported out of the box)
    "./src/next-i18next.config.js"
);

module.exports = withNextIntl(nextConfig);


// module.exports = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 's3.eu-north-1.amazonaws.com',
//                 port: '',
//                 pathname: '/hiclass.images/ClassImages/d2865f27-ea0e-4697-a939-f95f6343b798.JPG',
//             },
//         ],
//     },
// }
