import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { InfoCard } from "~/cases/characters/info-card";
import { StatsPanel } from "~/cases/characters/stats-panel";

export const Route = createFileRoute("/_default/characters/$name")({
	component: CharacterPage,
});

function CharacterPage() {
	return (
		<>
			<section className="pb-4">
				<InfoCard />
			</section>
			<section>
				<StatsPanel />
			</section>
		</>
	);
}
