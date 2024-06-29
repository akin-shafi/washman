/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	assetPrefix: 'https://washman.onrender.com',
  	publicRuntimeConfig: {BASE_URL: ' https://washman.onrender.com',},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				// pathname: '/**', // You can specify a more specific path if needed
			},
		],
	},
	experimental: {
		largePageDataBytes: 128 * 100000,
	},
};

module.exports = nextConfig;
