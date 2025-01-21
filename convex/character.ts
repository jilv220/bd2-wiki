import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
	args: { name: v.string() },
	handler: async (ctx, { name }) => {
		const character = await ctx.db
			.query("characters")
			.withIndex("by_name", (q) => q.eq("name", name))
			.first();
		if (!character) return;

		const [illust_inven_char_url, icon_misc_url] = await Promise.all([
			ctx.storage.getUrl(character.illust_inven_char_id),
			ctx.storage.getUrl(character.element_property.icon_misc_id),
		]);

		return {
			...character,
			illust_inven_char_url,
			element_property: {
				...character.element_property,
				icon_misc_url,
			},
		};
	},
});
