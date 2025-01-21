import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Common schemas
const AttackPropertySchema = v.union(v.literal("physical"), v.literal("magic"));
const ElementPropertySchema = v.union(
	v.literal("fire"),
	v.literal("water"),
	v.literal("wind"),
	v.literal("light"),
	v.literal("dark"),
	v.literal("none"),
);
const TargetSchema = v.union(
	v.literal("very_front"),
	v.literal("vault"),
	v.literal("ally"),
	v.literal("me"),
);
const TalentRankNameSchema = v.union(
	v.literal("Beginner"),
	v.literal("Intermediate"),
	v.literal("Advanced"),
	v.literal("Expert"),
	v.literal("Legendary"),
);
const StatOptionSchema = v.object({
	hp: v.optional(v.float64()),
	atk: v.optional(v.float64()),
	magic_atk: v.optional(v.float64()),
	crit_rate: v.optional(v.float64()),
	crit_dmg: v.optional(v.float64()),
	def: v.optional(v.float64()),
	magic_resist: v.optional(v.float64()),
});
const PotentialBondingSchema = v.object({
	hp: v.optional(v.float64()),
	atk: v.optional(v.float64()),
	magic_atk: v.optional(v.float64()),
	crit_rate: v.optional(v.float64()),
	crit_dmg: v.optional(v.float64()),
	def: v.optional(v.float64()),
	magic_resist: v.optional(v.float64()),
	fire_dmg: v.optional(v.float64()),
	water_dmg: v.optional(v.float64()),
	wind_dmg: v.optional(v.float64()),
	light_dmg: v.optional(v.float64()),
	dark_dmg: v.optional(v.float64()),
});
const KnockBackSchema = v.string();
const TalentSchema = v.string();

export default defineSchema(
	{
		// Costumes table
		costumes: defineTable({
			character_id: v.id("characters"), // Reference to parent character
			icon_costume_id: v.string(),
			name: v.string(),
			potential: v.object({
				bonding: PotentialBondingSchema,
				permanent: StatOptionSchema,
				skill: v.array(v.string()),
			}),
			skill: v.object({
				icon_range_id: v.string(),
				name: v.string(),
				skillicon_id: v.string(),
				target: TargetSchema,
				upgrade: v.array(
					v.object({
						cd: v.float64(),
						chain: v.optional(v.float64()),
						description: v.string(),
						level: v.optional(v.float64()),
						sp_cost: v.float64(),
					}),
				),
			}),
		}).index("by_character", ["character_id"]), // Index for efficient character-costume lookups

		// Modified characters table
		characters: defineTable({
			attack_property: v.object({
				icon_misc_id: v.string(),
				name: AttackPropertySchema,
			}),
			element_property: v.object({
				icon_misc_id: v.string(),
				name: ElementPropertySchema,
			}),
			exclusive_gear: v.object({
				basic_stat: StatOptionSchema,
				exclusive_ability: StatOptionSchema,
				stat_options: v.array(StatOptionSchema),
				icon_equipment_id: v.string(),
				name: v.string(),
			}),
			illust_inven_char_id: v.string(),
			knock_back: KnockBackSchema,
			name: v.string(),
			rarity: v.union(
				v.literal(1),
				v.literal(2),
				v.literal(3),
				v.literal(4),
				v.literal(5),
			),
			stats: v.object({
				atk: v.float64(),
				crit_dmg: v.float64(),
				crit_rate: v.float64(),
				def: v.float64(),
				hp: v.float64(),
				magic_atk: v.float64(),
				magic_resist: v.float64(),
			}),
			talent: v.object({
				bufficon_id: v.string(),
				name: TalentSchema,
				ranks: v.array(
					v.object({
						cost: v.float64(),
						description: v.string(),
						level: v.float64(),
						name: TalentRankNameSchema,
					}),
				),
			}),
			target: TargetSchema,
		}).index("by_name", ["name"]),
	},
	{
		schemaValidation: false,
	},
);
