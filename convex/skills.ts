import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
	args: { costume_id: v.id("costumes") },
	handler: async (ctx, { costume_id }) => {
		const skills = await ctx.db
			.query("skills")
			.withIndex("by_costume", (q) => q.eq("costume_id", costume_id))
			.collect();

		return Promise.all(
			skills.map(async (sk) => ({
				...sk,
				...(sk.icon_range_id
					? {
							icon_range_url: await ctx.storage.getUrl(sk.icon_range_id),
						}
					: {}),
				...(sk.skillicon_id
					? {
							skillicon_url: await ctx.storage.getUrl(sk.skillicon_id),
						}
					: {}),
			})),
		);
	},
});
