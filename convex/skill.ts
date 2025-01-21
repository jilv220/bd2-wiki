import { v } from "convex/values";
import { query } from "./_generated/server";
import { getPublicUrl } from "./utils";

export const get = query({
	args: { costume_id: v.id("costumes") },
	handler: async (ctx, { costume_id }) => {
		const skill = await ctx.db
			.query("skills")
			.withIndex("by_costume", (q) => q.eq("costume_id", costume_id))
			.first();

		if (!skill) return;

		return {
			...skill,
			icon_range_url: getPublicUrl(skill.icon_range_id),
			skillicon_url: getPublicUrl(skill.skillicon_id),
		};
	},
});
