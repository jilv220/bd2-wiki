export type Target = "very_front" | "vault" | "ally";

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

export type TalentRankLevel = 1 | 2 | 3 | 4 | 5;
export type TalentRankName =
	| "Beginner"
	| "Intermediate"
	| "Advanced"
	| "Expert"
	| "Legendary";

export type TalentRank = {
	level: TalentRankLevel;
	name: TalentRankName;
	cost: number;
	description: string;
};

export type Talent = {
	name: string;
	bufficon_id: string;
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
	target: Target;
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
	icon_costume_id: string;
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
	target: Target;
	knock_back: string;
	stats: Stats;
	talent: Talent;
	exclusive_gear: ExclusiveGear;
	costumes: Costume[];
};

export type CharacterData = Character[];
