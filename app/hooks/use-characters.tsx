import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi, notFound, useParams } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export function useCharacters() {
	const { data: characters } = useSuspenseQuery(
		convexQuery(api.characters.get, {}),
	);
	return characters;
}

export function useCharacter() {
	const routeApi = getRouteApi("/characters/$name");
	const { name } = routeApi.useParams();
	const { data: characters } = useSuspenseQuery(
		convexQuery(api.character.get, { name }),
	);

	if (characters.length === 0) throw notFound();

	return characters[0];
}
export type Character = ReturnType<typeof useCharacter>;

export type Talent = Character["talent"];
export type TalentRanks = Talent["ranks"];
export type TalentRank = TalentRanks[0];

export type Costumes = Character["costumes"];
export type Costume = Costumes[0];
