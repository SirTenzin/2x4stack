export default {
	providers: [
		{
			domain: process.env.KINDE_ISSUER_URL as string,
			applicationID: "convex",
		},
	],
};
