import { getRouteApi } from "@tanstack/react-router";
import { useMemo } from "react";

export function useCharacters() {
	const routeApi = getRouteApi("/characters");
	const characters = routeApi.useLoaderData();
	return characters;
}

export function useCharacter() {
	const routeApi = getRouteApi("/characters/$name");
	const character = routeApi.useLoaderData();
	return character;
}
