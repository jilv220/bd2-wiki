import { convexQuery } from "@convex-dev/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { nanoid } from "nanoid";
import { map, pipe, toKebabCase, unique } from "remeda";
import { PackTable } from "~/cases/collections/pack-table";
import { HiddenH1 } from "~/components/hidden-h1";
import { badgeVariants } from "~/components/ui/badge";
import { useCollections } from "~/hooks/use-collections";
import { cn, snakeCaseToText } from "~/lib/utils";

export const Route = createFileRoute("/_default/collections/")({
	loader: async ({ context }) => {
		const { queryClient } = context;
		await queryClient.ensureQueryData(convexQuery(api.collections.get, {}));
	},
	component: CollectionsPage,
});

function CollectionsPage() {
	const collections = useCollections();
	const locations = collections.map((coll) => coll.location);
	const locationDisplays = pipe(
		locations.map((loc) => snakeCaseToText(loc)),
		(locs) => unique(locs),
		map((loc) => ({
			label: loc,
			url: `${Route.fullPath}#${toKebabCase(loc)}`,
		})),
	);

	const pack1 = collections.filter((coll) => coll.location === "pack_1");
	const pack2 = collections.filter((coll) => coll.location === "pack_2");

	return (
		<div className="p-4">
			<HiddenH1>Collections</HiddenH1>
			<div className="mb-6 flex flex-col">
				<div className="flex items-center">
					<span className="mr-2 font-medium text-muted-foreground text-xs sm:text-sm">
						Story Packs:
					</span>
					<div className="space-x-2">
						{locationDisplays.map((loc, idx) => (
							<Link
								from={Route.fullPath}
								to={loc.url}
								className={cn(
									badgeVariants({ variant: "accent" }),
									"h-8 px-3 py-0 focus:ring-0 focus:ring-offset-0",
								)}
								key={nanoid(idx)}
							>
								{loc.label}
							</Link>
						))}
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<PackTable collections={pack1} title="Pack 1" />
				<PackTable collections={pack2} title="Pack 2" />
			</div>
		</div>
	);
}
