import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	numbers: defineTable({
		value: v.number(),
		userId: v.optional(v.string()),
	}).index("by_user", ["userId"]),

	users: defineTable({
		email: v.string(),
		firstName: v.optional(v.string()),
		lastName: v.optional(v.string()),
		userId: v.string(),
		organizations: v.optional(v.array(v.object({
			code: v.string(),
			roles: v.optional(v.array(v.string())),
			permissions: v.optional(v.array(v.string())),
		}))),
		phone: v.optional(v.string()),
		username: v.optional(v.string()),
	}).index("by_user_id", ["userId"]),
});
