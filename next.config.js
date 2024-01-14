/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mp.weixin.qq.com',
                port: '',
                pathname: '**',
            },
        ],
    },
};
