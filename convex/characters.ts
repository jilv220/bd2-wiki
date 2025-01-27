import { query } from "./_generated/server";
import { getPublicUrl } from "./utils";

export const get = query({
	args: {},
	handler: async (ctx) => {
		const characters = await ctx.db.query("characters").collect();
		return characters.map((character) => ({
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
		}));
	},
});
