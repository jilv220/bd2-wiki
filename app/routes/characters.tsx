import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * Turns out this is the "parent route"
 * You cannot fetch in .index.tsx and hope to share loaderdata in .$name.tsx ...
 */
export const Route = createFileRoute("/characters")({
	component: CharactersPageLayout,
});

function CharactersPageLayout() {
	return <Outlet />;
}
