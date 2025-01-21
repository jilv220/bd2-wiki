import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
	args: { character_id: v.id("characters") },
	handler: async (ctx, { character_id }) => {
		const eg = await ctx.db
			.query("exclusive_gears")
			.withIndex("by_character", (q) => q.eq("character_id", character_id))
			.first();

		if (!eg) return;

		return {
			...eg,
			icon_equipment_url: await ctx.storage.getUrl(eg.icon_equipment_id),
		};
	},
});
