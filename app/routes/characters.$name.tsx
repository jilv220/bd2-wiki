import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { capitalize, merge, mergeAll } from "remeda";
import { CostumesCard } from "~/cases/characters/costumes-card";
import { InfoCard } from "~/cases/characters/info-card";
import { StatsPanel } from "~/cases/characters/stats-panel";
import { TalentCard } from "~/cases/characters/talent-card";
import { seo } from "~/lib/seo";
import { SITE_TITLE, rootSeo } from "./__root";

export const Route = createFileRoute("/characters/$name")({
	head: ({ params }) => {
		const { name } = params;

		return {
			meta: seo({
				title: `${capitalize(name)} | ${SITE_TITLE}`,
				description: `${capitalize(name)}'s basic info, stats, talent, costumes, and skills`,
			}),
		};
	},
	component: CharacterPage,
	headers: () => {
		return {
			"cache-control": "public, max-age=0, must-revalidate",
			"cdn-cache-control": "max-age=3600, stale-while-revalidate=3600, durable",
		};
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
