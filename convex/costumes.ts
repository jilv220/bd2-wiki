import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
	args: { char_id: v.id("characters") },
	handler: async (ctx, { char_id }) => {
		const costumes = await ctx.db
			.query("costumes")
			.withIndex("by_character", (q) => q.eq("character_id", char_id))
			.collect();

		return Promise.all(
			costumes.map(async (co) => ({
				...co,
				...(co.icon_costume_id
					? {
							url: await ctx.storage.getUrl(co.icon_costume_id),
						}
					: {}),
			})),
		);
	},
});
