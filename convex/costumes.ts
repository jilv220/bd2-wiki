import { v } from "convex/values";
import * as R from "remeda";
import { query } from "./_generated/server";
import { getPublicUrl } from "./utils";

const isSkillRangeUpgrade = (skill: string) => skill.startsWith("ru#");

export const get = query({
	args: { character_id: v.id("characters") },
	handler: async (ctx, { character_id }) => {
		const costumes = await ctx.db
			.query("costumes")
			.withIndex("by_character", (q) => q.eq("character_id", character_id))
			.collect();

		return costumes.map((co) => {
			const costumeWithPublicUrl = R.pipe(
				co,
				R.addProp("icon_costume_url", getPublicUrl(co.icon_costume_id)),
			);

			const skillPotentials = co.potential.skill;
			const skillWithMappedRangeUpgrade = skillPotentials.map((sp) => {
				if (!isSkillRangeUpgrade(sp)) return sp;
				const [_, icon_range_id] = sp.split("#");
				return getPublicUrl(icon_range_id);
			});

			return R.setPath(
				costumeWithPublicUrl,
				["potential", "skill"],
				skillWithMappedRangeUpgrade,
			);
		});
	},
});
