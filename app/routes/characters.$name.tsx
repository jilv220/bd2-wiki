import { convexQuery } from "@convex-dev/react-query";
import {
	type NotFoundRouteProps,
	createFileRoute,
	getRouteApi,
	notFound,
} from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { capitalize, merge, mergeAll } from "remeda";
import { CostumesCard } from "~/cases/characters/costumes-card";
import { CharacterDataNotFound } from "~/cases/characters/errors";
import { ExclusiveGear } from "~/cases/characters/exclusive-gear";
import { InfoCard } from "~/cases/characters/info-card";
import { StatsPanel } from "~/cases/characters/stats-panel";
import { TalentCard } from "~/cases/characters/talent-card";
import { seo } from "~/lib/seo";
import { SITE_TITLE, rootSeo } from "./__root";

export const Route = createFileRoute("/characters/$name")({
	loader: async ({ context, params }) => {
		const { name } = params;
		const { queryClient } = context;

		const character = await queryClient.ensureQueryData(
			convexQuery(api.character.get, { name }),
		);
		if (!character) throw notFound();

		const costumesP = queryClient.ensureQueryData(
			convexQuery(api.costumes.get, { character_id: character?._id }),
		);
		const exclusiveGearP = queryClient.ensureQueryData(
			convexQuery(api.exclusive_gear.get, { character_id: character._id }),
		);
		const talentP = queryClient.ensureQueryData(
			convexQuery(api.talent.get, { character_id: character._id }),
		);

		const [costumes, exclusiveGear, talent] = await Promise.all([
			costumesP,
			exclusiveGearP,
			talentP,
		]);
		if (!costumes || !exclusiveGear || !talent) {
			throw new CharacterDataNotFound(
				`Fail to get data associated with ${name}`,
				name,
			);
		}

		return {
			...character,
			costumes,
			exclusive_gear: exclusiveGear,
			talent,
		};
	},
	head: ({ params, loaderData }) => {
		const { name } = params;
		const character = loaderData;

		return {
			meta: seo({
				title: `${capitalize(name)} | ${SITE_TITLE}`,
				description:
					`${capitalize(name)} is a ${character?.rarity} star ` +
					`${character?.element_property.name} element character in Brown Dust 2 ` +
					`with ${character?.attack_property.name} attacks. ` +
					`Features ${character?.costumes.length} unique costumes and ${character?.talent.name} talent.`,
			}),
		};
	},
	component: CharacterPage,
	notFoundComponent: (props) => CharacterNotFoundBoundary(props),
	errorComponent: ({ error }) => {
		if (error instanceof CharacterDataNotFound) {
			return <>{error.message}</>;
		}

		return <>Unknown error</>;
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
			<section>
				<ExclusiveGear />
			</section>
		</div>
	);
}

const CharacterNotFoundBoundary = (props: NotFoundRouteProps) => {
	const { name } = Route.useParams();
	return <>Character {name} does not exist.</>;
};
