import { createServerFn } from "@tanstack/start";
import { getSupabaseServerClient } from "~/lib/supabase";

export type ElementProperty = {
	name: "fire" | "water" | "wind" | "light" | "dark" | "none";
	icon_misc_id: string;
};

export type AttackProperty = {
	name: "physical" | "magical";
	icon_misc_id: string;
};

export type Stats = {
	hp: number;
	atk: number;
	magic_atk: number;
	crit_rate: number;
	crit_dmg: number;
	def: number;
	magic_resist: number;
};

export type TalentRank = {
	level: number;
	name: string;
	cost: number;
	rank_value: number;
};

export type Talent = {
	name: string;
	bufficon_id: string;
	description_template: string;
	ranks: TalentRank[];
};

export type SkillUpgrade = {
	level: number;
	sp_cost: number;
	cd: number;
	chain: number;
	upgrade_value: number;
};

export type Skill = {
	name: string;
	skillicon_id: string;
	range: string;
	description_template: string;
	upgrade: SkillUpgrade[];
};

export type StatOption = {
	[key in "hp" | "atk" | "def" | "magic_resist"]?: number;
};

export type ExclusiveGear = {
	name: string;
	icon_equipment_id: string;
	exclusive_ability: {
		atk?: number;
		def?: number;
		hp?: number;
		magic_resist?: number;
	};
	basic_stat: {
		def?: number;
		hp?: number;
		atk?: number;
		magic_resist?: number;
		options: StatOption[];
	};
};

export type Potential = {
	permanent: {
		atk?: number;
		hp?: number;
		def?: number;
		magic_resist?: number;
	};
	bonding: {
		hp: number;
		atk: number;
		def: number;
	};
	skill: string[];
};

export type Costume = {
	id_costume: string;
	costume_name: string;
	skill: Skill;
	potential: Potential;
};

export type Character = {
	id_char: string;
	char_name: string;
	illust_inven_char_id: string;
	rarity: number;
	element_property: ElementProperty;
	attack_property: AttackProperty;
	target: string;
	knock_back: string;
	stats: Stats;
	talent: Talent;
	exclusive_gear: ExclusiveGear;
	costume: Costume[];
};

export type CharacterData = Character[];

export const fetchCharacters = createServerFn({ method: "GET" }).handler(
	async () => {
		const supabase = getSupabaseServerClient();
		const { data: charData } = supabase.storage
			.from("characters")
			.getPublicUrl("data.json");

		const resp = await fetch(charData.publicUrl);
		const data = await resp.json();

		return data as CharacterData;
	},
);

export const fetchUrlFromBucket = createServerFn({ method: "GET" })
	.validator(
		(d: {
			id: string;
			bucketId: string;
			ext: "png";
		}) => d,
	)
	.handler(async ({ data }) => {
		const { data: res } = getSupabaseServerClient()
			.storage.from(data.bucketId)
			.getPublicUrl(`${data.id}.${data.ext}`);
		return res.publicUrl;
	});

export const fetchInventoryIllustUrl = (id: string, ext: "png" = "png") =>
	fetchUrlFromBucket({
		data: {
			id,
			bucketId: "illust_inven_char",
			ext,
		},
	});

export const fetchIconMiscUrl = (id: string, ext: "png" = "png") =>
	fetchUrlFromBucket({
		data: {
			id,
			bucketId: "icon_misc",
			ext,
		},
	});
