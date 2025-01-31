import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, invariant } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export function useCharacters() {
	const { data: characters } = useSuspenseQuery(
		convexQuery(api.characters.get, {}),
	);
	return characters;
}

export function useCharacter() {
	const routeApi = getRouteApi("/_default/characters/$name");
	const { name } = routeApi.useParams();
	const { data: character } = useSuspenseQuery(
		convexQuery(api.character.get, { name }),
	);
	invariant(character);

	const { data: costumes } = useSuspenseQuery(
		convexQuery(api.costumes.get, { character_id: character._id }),
	);
	const { data: exclusiveGear } = useSuspenseQuery(
		convexQuery(api.exclusive_gear.get, { character_id: character._id }),
	);
	const { data: talent } = useSuspenseQuery(
		convexQuery(api.talent.get, { character_id: character._id }),
	);
	invariant(talent);

	return {
		...character,
		costumes,
		exclusive_gear: exclusiveGear,
		talent,
	};
}

export type BaseCharacter = Omit<
	Character,
	"costumes" | "talent" | "_creationTime" | "exclusive_gear"
>;
export type Character = ReturnType<typeof useCharacter>;

export type AttackProperty = Character["attack_property"]["name"];
export type ElementProperty = Character["element_property"]["name"];
export type Rarity = Character["rarity"];
export type StatOption = keyof Character["stats"];
export type Target = Character["target"];

export type Talent = Character["talent"];
export type TalentRanks = Talent["ranks"];
export type TalentRank = TalentRanks[0];

export type Costumes = Character["costumes"];
export type Costume = Costumes[0];
export type PotentialBondingStatOption =
	keyof Character["costumes"][0]["potential"]["bonding"];
