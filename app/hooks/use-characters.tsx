import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, invariant, notFound } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export function useCharacters() {
	const { data: characters } = useSuspenseQuery(
		convexQuery(api.characters.get, {}),
	);

	return characters;
}

export function useCharacter() {
	const routeApi = getRouteApi("/characters/$name");
	const character = routeApi.useLoaderData();
	return character;
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
