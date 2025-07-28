import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { autumnHandler } from "autumn-js/convex";
import { ROUTABLE_HTTP_METHODS } from "convex/server";
import { handleKindeWebhook } from "./auth/kinde";
import { api } from "./_generated/api";

const http = httpRouter();

const baseAutumnHandler = autumnHandler({
	httpAction,
	identify: async (ctx) => {
		try {
			const user = await ctx.runQuery(api.auth.user.current);

			console.log("User", user);

			if (!user) {
				return null;
			}
			return {
				customerId: user.userId,
				customerData: {
					name:
						(
							(user?.firstName ?? "") +
							" " +
							(user?.lastName ?? "")
						).trim() ||
						user.username ||
						"Unknown",
					email: user?.email || user.username,
				},
			};
		} catch (error) {
			console.error("Error in autumn identify function:", error);
			return null;
		}
	},
	secretKey: process.env.AUTUMN_SECRET_KEY,
});

// Wrapper to ensure proper CORS credentials handling
const handleAutumnRequests = httpAction(async (ctx, request) => {
	// Handle preflight requests with proper CORS headers for Authorization
	if (request.method === "OPTIONS") {
		return new Response(null, {
			status: 200,
			headers: {
				"Access-Control-Allow-Origin":
					process.env.CLIENT_ORIGIN || "http://localhost:3000",
				"Access-Control-Allow-Methods":
					"GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers":
					"Content-Type, Authorization, Digest",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Max-Age": "86400",
			},
		});
	}

	const response = await baseAutumnHandler(ctx, request);

	// Ensure Access-Control-Allow-Credentials is set for all responses
	const headers = new Headers(response.headers);
	headers.set("Access-Control-Allow-Credentials", "true");
	headers.set(
		"Access-Control-Allow-Origin",
		process.env.CLIENT_ORIGIN || "http://localhost:3000"
	);

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: headers,
	});
});

for (const method of ROUTABLE_HTTP_METHODS) {
	http.route({
		pathPrefix: "/api/autumn/",
		method,
		handler: handleAutumnRequests,
	});
}

http.route({
	path: "/api/kinde/webhook",
	method: "POST",
	handler: handleKindeWebhook,
});

export default http;
