import type {
	Merge,
	MergeDeep,
	RequireExactlyOne,
	SetNonNullable,
} from "type-fest";
import type { Database as DatabaseGenerated, Json } from "./database.gen.types";
export type { Json } from "./database.gen.types";

type Stat =
	| "hp"
	| "atk"
	| "magic_atk"
	| "crit_rate"
	| "crit_dmg"
	| "def"
	| "magic_resist";
type StatOption = {
	[key in Stat]?: number;
};

type ExclusiveAbility = RequireExactlyOne<StatOption>;

type BasicStat = RequireExactlyOne<StatOption> & {
	options: StatOption[];
};

export type Potential = {
	permanent: RequireExactlyOne<StatOption>;
	bonding: StatOption;
	skill: string[];
};

type CharacterCoreRow =
	DatabaseGenerated["public"]["Views"]["characters_core_view"]["Row"];
export type NonNullCharacterCoreRow = Merge<
	SetNonNullable<CharacterCoreRow>,
	{
		exclusive_ability: ExclusiveAbility;
		basic_stat: BasicStat;
	}
>;

type CharacterTalentsRow =
	DatabaseGenerated["public"]["Views"]["character_talents_view"]["Row"];
export type NonNullCharacterTalentsRow = SetNonNullable<CharacterTalentsRow>;
export type Talent = NonNullCharacterTalentsRow;

type CharacterCostumesRow =
	DatabaseGenerated["public"]["Views"]["character_costumes_view"]["Row"];
export type NonNullCharacterCostumeRow = Merge<
	SetNonNullable<CharacterCostumesRow>,
	{
		potential: Potential;
	}
>;
export type Cosutme = NonNullCharacterCostumeRow;

// Override the type for a specific column in a view:
export type Database = DatabaseGenerated;
