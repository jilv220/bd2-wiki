import { getRouteApi } from "@tanstack/react-router";

export function useCharacters() {
	const routeApi = getRouteApi("/characters/");
	const characters = routeApi.useLoaderData();
	return characters;
}

export function useCharacter() {
	const routeApi = getRouteApi("/characters/$name");
	const character = routeApi.useLoaderData();
	return character;
}

export type Character = ReturnType<typeof useCharacter>;

export type AttackProperty = Character["attack_property"]["name"];
export type ElementProperty = Character["element_property"]["name"];
export type Rarity = Character["rarity"];
export type StatOption = keyof Character["stats"];

export type Talent = Character["talent"];
export type TalentRanks = Talent["ranks"];
export type TalentRank = TalentRanks[0];

export type Costumes = Character["costumes"];
export type Costume = Costumes[0];
export type PotentialBondingStatOption =
	keyof Character["costumes"][0]["potential"]["bonding"];
