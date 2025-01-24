import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, invariant, notFound } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { CharacterDataNotFound } from "~/cases/characters/errors";

export function useCharacters() {
	const { data: characters } = useSuspenseQuery(
		convexQuery(api.characters.get, {}),
	);

	return characters;
}

export function useCharacter() {
	const routeApi = getRouteApi("/characters/$name");
	const { name } = routeApi.useParams();

	const { data: character } = useSuspenseQuery(
		convexQuery(api.character.get, { name }),
	);
	if (!character)
		throw new CharacterDataNotFound(`Fail to fetch character ${name}`, name);

	const { data: costumes } = useSuspenseQuery(
		convexQuery(api.costumes.get, { character_id: character._id }),
	);
	if (costumes.length === 0) {
		throw new CharacterDataNotFound(
			`Fail to fetch costumes for character ${name}`,
			name,
		);
	}

	const { data: exclusiveGear } = useSuspenseQuery(
		convexQuery(api.exclusive_gear.get, { character_id: character._id }),
	);
	if (!exclusiveGear) {
		throw new CharacterDataNotFound(
			`Fail to fetch exlusive gear for character ${name}`,
			name,
		);
	}

	const { data: talent } = useSuspenseQuery(
		convexQuery(api.talent.get, { character_id: character._id }),
	);
	if (!talent) {
		throw new CharacterDataNotFound(
			`Fail to fetch exlusive gear for character ${name}`,
			name,
		);
	}

	return {
		...character,
		costumes,
		exclusive_gear: exclusiveGear,
		talent,
	};
}
export type Character = ReturnType<typeof useCharacter>;
export type ElementProperty = Character["element_property"]["name"];
export type StatOption = keyof Character["stats"];

export type Talent = Character["talent"];
export type TalentRanks = Talent["ranks"];
export type TalentRank = TalentRanks[0];

export type Costumes = Character["costumes"];
export type Costume = Costumes[0];
export type PotentialBondingStatOption =
	keyof Character["costumes"][0]["potential"]["bonding"];
