import { v } from "convex/values";
import { query } from "./_generated/server";
import { getPublicUrl } from "./utils";

export const get = query({
	args: { character_id: v.id("characters") },
	handler: async (ctx, { character_id }) => {
		const talent = await ctx.db
			.query("talents")
			.withIndex("by_charcter", (q) => q.eq("character_id", character_id))
			.first();

		if (!talent) return;

		return {
			...talent,
			bufficon_url: getPublicUrl(talent.bufficon_id),
		};
	},
});
