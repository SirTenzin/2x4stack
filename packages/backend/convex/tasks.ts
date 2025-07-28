import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";
import { Autumn } from "autumn-js"

export const listNumbers = query({
  // Validators for arguments.
  args: {
    count: v.number(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const numbers = await ctx.db
      .query("numbers")
      .withIndex("by_user", (q) => q.eq("userId", identity?.subject ?? ""))
      .order("desc")
      .take(args.count);
    return {
      viewer: identity?.name ?? "unauthenticated",
      numbers: numbers.reverse(),
    };
  },
});

export const addNumber = mutation({
  args: {
    value: v.number(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const id = await ctx.db.insert("numbers", { value: args.value, userId: identity?.subject });

    console.log("Added new document with id:", id);
  },
});

export const deleteById = mutation({
  args: {
    id: v.id("numbers"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const generateRandomNumbers = action({
  args: {
    count: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const autumn = new Autumn({
      secretKey: process.env.AUTUMN_SECRET_KEY!,
    });

    const isAllowed = await autumn.check({
      customer_id: identity?.subject ?? "",
      feature_id: "random_number",
      send_event: true,
      required_balance: args.count
    })

    if (!isAllowed) {
      throw new Error("User is not allowed to generate random numbers");
    }

    if(isAllowed.error) {
      throw new Error(isAllowed.error.message);
    }

    if(!isAllowed.data.allowed) return { success: false, code: "not_allowed" };

    for (let i = 0; i < args.count; i++) {
      await ctx.runMutation(api.tasks.addNumber, { value: Math.floor(Math.random() * 100) });
    }
    return { success: true };
  },
});

export const myAction = action({
  args: {
    first: v.number(),
  },

  handler: async (ctx, args) => {
    const data = await ctx.runQuery(api.tasks.listNumbers, {
      count: 10,
    });
    console.log(data);

    //// Write data by running Convex mutations.
    await ctx.runMutation(api.tasks.addNumber, {
      value: args.first,
    });
  },
});
