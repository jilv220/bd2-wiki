import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { capitalize } from "remeda";
import { CharacterCard } from "~/cases/characters/character-card";

export const Route = createFileRoute("/_default/characters/$name")({
	component: CharacterPage,
});

function CharacterPage() {
	return (
		<>
			<section>
				<CharacterCard />
			</section>
		</>
	);
}
