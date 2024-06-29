/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	assetPrefix: process.env.ASSET_PREFIX || "",
	publicRuntimeConfig: {
		BASE_URL: process.env.BASE_URL || "https://washman.onrender.com",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				// pathname: '/**', // You can specify a more specific path if needed
			},
		],
		// Optionally specify the loader and path for custom optimization
		loader: "default",
		path: "/public/images",
	},
	experimental: {
		largePageDataBytes: 128 * 100000,
	},
};

module.exports = nextConfig;
