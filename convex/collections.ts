import { query } from "./_generated/server";
import { getPublicUrl } from "./utils";

export const get = query({
	args: {},
	handler: async (ctx) => {
		const collections = await ctx.db.query("collections").collect();
		return collections.map((coll) => ({
			...coll,
			icon_url: getPublicUrl(coll.icon_id),
		}));
	},
});
