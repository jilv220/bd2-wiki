import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { InfoCard } from "~/cases/characters/info-card";
import { StatsPanel } from "~/cases/characters/stats-panel";
import { TalentCard } from "~/cases/characters/talent-card";

export const Route = createFileRoute("/_default/characters/$name")({
	component: CharacterPage,
});

function CharacterPage() {
	return (
		<div className="space-y-4">
			<section>
				<InfoCard />
			</section>
			<section>
				<StatsPanel />
			</section>
			<section>
				<TalentCard />
			</section>
		</div>
	);
}
