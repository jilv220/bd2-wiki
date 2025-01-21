import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
	args: { costume_id: v.id("costumes") },
	handler: async (ctx, { costume_id }) => {
		const skill = await ctx.db
			.query("skills")
			.withIndex("by_costume", (q) => q.eq("costume_id", costume_id))
			.first();

		if (!skill) return;
		const [icon_range_url, skillicon_url] = await Promise.all([
			ctx.storage.getUrl(skill.icon_range_id),
			ctx.storage.getUrl(skill.skillicon_id),
		]);

		return {
			...skill,
			icon_range_url,
			skillicon_url,
		};
	},
});
