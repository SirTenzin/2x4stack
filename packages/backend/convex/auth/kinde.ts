import { v } from "convex/values";
import { action, internalAction, internalQuery, mutation, httpAction, type ActionCtx } from "../_generated/server";
import * as jose from "jose";
import { ActionCache } from "@convex-dev/action-cache";
import { internal, components, api } from "../_generated/api";
import type { KindeWebhookPayload, KindeUserCreatedData, KindeUserUpdatedData, KindeUserDeletedData } from "../types/KindeTypes";

// Cache for the RemoteJWKSet URL - we only need to cache the URL, not the actual JWKS
const cache = new ActionCache(components.actionCache, {
	action: internal.auth.kinde.getJWKSUrl,
	ttl: 1000 * 60 * 60 * 24 * 30, // 30 days
});

async function validateRequest(ctx: ActionCtx, request: Request): Promise<KindeWebhookPayload | null> {
	const jwt = await request.text();
	if (!jwt) {
		console.error("No JWT present in the request body");
		return null;
	}

	try {
		const jwksUrl = await ctx.runAction(api.auth.kinde.getJWKSUrlCached);
		
		// Create the RemoteJWKSet locally
		const JWKS = jose.createRemoteJWKSet(new URL(jwksUrl));

		const { payload } = await jose.jwtVerify(
			jwt,
			JWKS,
			{}
		);

		return payload as unknown as KindeWebhookPayload;
	} catch (error) {
		console.error("JWT verification failed:", error);
		return null;
	}
}

// Kinde webhook handler
export const handleKindeWebhook = httpAction(async (ctx, request) => {
	const event = await validateRequest(ctx, request);
	if (!event) {
		return new Response("JWT validation failed", { status: 401 });
	}

	console.log(`Processing Kinde webhook event: ${event.type}`);

	switch (event.type) {
		case "user.created": {
			console.log("Handling user.created event");
			const userData = event.data as KindeUserCreatedData;
			console.log("User data:", userData.user);
			
			await ctx.runMutation(api.auth.kinde.upsertUser, {
				email: userData.user.email,
				firstName: userData.user.first_name,
				lastName: userData.user.last_name,
				id: userData.user.id,
				organizations: userData.user.organizations.map(org => ({
					code: org.code,
					roles: org.roles ?? undefined,
					permissions: org.permissions ?? undefined,
				})),
				phone: userData.user.phone || undefined,
				username: userData.user.username || undefined,
			});
			break;
		}
		
		case "user.updated": {
			console.log("Handling user.updated event");
			const userData = event.data as KindeUserUpdatedData;
			console.log("User data:", userData.user);
			
			await ctx.runMutation(api.auth.kinde.upsertUser, {
				email: userData.user.email || "",
				firstName: userData.user.first_name,
				lastName: userData.user.last_name,
				id: userData.user.id,
				phone: userData.user.phone || undefined,
				username: userData.user.username || undefined,
			});
			break;
		}
		
		case "user.deleted": {
			console.log("Handling user.deleted event");
			const userData = event.data as KindeUserDeletedData;
			console.log("User data:", userData.user);
			
			await ctx.runMutation(api.auth.kinde.deleteUser, {
				userId: userData.user.id,
			});
			break;
		}
		
		default:
			console.log("Unhandled event type:", event.type);
			console.log("Event data:", event.data);
	}
	
	return new Response(null, { status: 200 });
});

export const identifyUser = action({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		return identity ?? "unauthenticated";
	},
});

// Return the JWKS URL for creating RemoteJWKSet
export const getJWKSUrl = internalAction({
	handler: async () => {
		if (!process.env.KINDE_ISSUER_URL) {
			throw new Error("KINDE_ISSUER_URL environment variable is not set");
		}
		return process.env.KINDE_ISSUER_URL + "/.well-known/jwks";
	},
});

// Get the JWKS URL from cache
export const getJWKSUrlCached = action({
	handler: async (ctx): Promise<string> => {
		return await cache.fetch(ctx, {});
	},
});

export const upsertUser = mutation({
    args: {
        email: v.string(),
        firstName: v.optional(v.string()),
        lastName: v.optional(v.string()),
        id: v.string(),
		organizations: v.optional(v.array(v.object({
			code: v.string(),
			roles: v.optional(v.array(v.string())),
			permissions: v.optional(v.array(v.string())),
		}))),
        phone: v.optional(v.string()),
        username: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").withIndex("by_user_id", (q) => q.eq("userId", args.id)).first();
        if (user) {
            await ctx.db.patch(user._id, {
                email: args.email,
                firstName: args.firstName,
                lastName: args.lastName,
				organizations: args.organizations,
            });
        } else {
            await ctx.db.insert("users", {
                email: args.email,
                firstName: args.firstName,
                lastName: args.lastName,
                userId: args.id,
                phone: args.phone,
                username: args.username,
				organizations: args.organizations,
            });
        }
    }
})

export const kindeIdToConvexId = internalQuery({
    args: {
        kindeId: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").withIndex("by_user_id", (q) => q.eq("userId", args.kindeId)).first();
        return user?._id;
    }
})

export const deleteUser = mutation({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        let userId = await ctx.runQuery(internal.auth.kinde.kindeIdToConvexId, {
            kindeId: args.userId,
        });
        if (userId) {
            await ctx.db.delete(userId);
        } else throw new Error("User not found");
    }
});