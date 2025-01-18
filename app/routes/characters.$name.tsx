import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { CostumesCard } from "~/cases/characters/costumes-card";
import {
	fetchCharacterCore,
	fetchCharacterCostumes,
	fetchCharacterTalent,
} from "~/cases/characters/fetch";
import { InfoCard } from "~/cases/characters/info-card";
import { StatsPanel } from "~/cases/characters/stats-panel";
import { TalentCard } from "~/cases/characters/talent-card";

export const Route = createFileRoute("/characters/$name")({
	component: CharacterPage,
	loader: async ({ params }) => {
		const core = await fetchCharacterCore({
			data: {
				name: params.name,
			},
		});

		const talentsP = fetchCharacterTalent({
			data: {
				id: core.id,
			},
		});

		const costumesP = fetchCharacterCostumes({
			data: {
				id: core.id,
			},
		});

		const [talents, costumes] = await Promise.all([talentsP, costumesP]);

		return { core, talents, costumes };
	},
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
