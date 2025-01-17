import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { CostumesCard } from "~/cases/characters/costumes-card";
import { InfoCard } from "~/cases/characters/info-card";
import { StatsPanel } from "~/cases/characters/stats-panel";
import { TalentCard } from "~/cases/characters/talent-card";

export const Route = createFileRoute("/characters/$name")({
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
			<section>
				<CostumesCard />
			</section>
		</div>
	);
}
