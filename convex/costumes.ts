import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
	args: { char_id: v.id("characters") },
	handler: async (ctx, { char_id }) => {
		return await ctx.db
			.query("costumes")
			.withIndex("by_character", (q) => q.eq("character_id", char_id))
			.collect();
	},
});
