import { Outlet, createFileRoute } from "@tanstack/react-router";
import { fetchCharacters } from "~/cases/characters/fetch";

/**
 * Turns out this is the "parent route"
 * You cannot fetch in .index.tsx and hope to share loaderdata in .$name.tsx ...
 */
export const Route = createFileRoute("/characters")({
	component: CharactersPageLayout,
	loader: () => fetchCharacters(),
	errorComponent: () => <>Fail to fetch characters</>,
});

function CharactersPageLayout() {
	return <Outlet />;
}
