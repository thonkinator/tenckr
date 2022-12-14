/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	rewrites: async () => {
		return {
			afterFiles: [
				{
					source: "/:str(.*)*", // this matches anything starting with "view"
					destination: "/api?str=:str*", //"/api/view\\?str=:str*"
				},
			],
		};
	},
	redirects: async () => {
		return [
			{
				source: "/api/:endpoint*", // any requests to an /api/ endpoint
				destination: "/:endpoint*", // redirect to the root
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
