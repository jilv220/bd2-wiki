import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
	args: { name: v.string() },
	handler: async (ctx, { name }) => {
		return await ctx.db
			.query("characters")
			.withIndex("by_name", (q) => q.eq("name", name))
			.collect();
	},
});
