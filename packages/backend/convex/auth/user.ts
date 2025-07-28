import { query } from "../_generated/server";

export const current = query({
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return null;
		return await ctx.db.query("users").withIndex("by_user_id", (q) => q.eq("userId", identity.subject)).first();
	},
});