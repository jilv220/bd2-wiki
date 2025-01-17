import { getRouteApi } from "@tanstack/react-router";
import { useMemo } from "react";

export function useCharacters() {
	const routeApi = getRouteApi("/characters");
	const characters = routeApi.useLoaderData();
	return characters;
}

export function useCharacter(name: string) {
	const characters = useCharacters();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Only fetch once and readonly
	const res = useMemo(
		() => characters.filter((chr) => chr.char_name === name),
		[name],
	);

	if (res.length === 0)
		throw new Error(`No characer with name: ${name} found!`);

	return res[0];
}
