import { v } from "convex/values";
import { query } from "./_generated/server";
import { getPublicUrl } from "./utils";

export const get = query({
	args: { name: v.string() },
	handler: async (ctx, { name }) => {
		const character = await ctx.db
			.query("characters")
			.withIndex("by_name", (q) => q.eq("name", name))
			.first();
		if (!character) return;

		return {
			...character,
			illust_inven_char_url: getPublicUrl(character.illust_inven_char_id),
			element_property: {
				...character.element_property,
				icon_misc_url: getPublicUrl(character.element_property.icon_misc_id),
			},
			attack_property: {
				...character.attack_property,
				icon_misc_url: getPublicUrl(character.attack_property.icon_misc_id),
			},
		};
	},
});
