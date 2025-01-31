import { convexQuery } from "@convex-dev/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { nanoid } from "nanoid";
import { PackTable } from "~/cases/collections/pack-table";
import { HiddenH1 } from "~/components/hidden-h1";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { useCollections } from "~/hooks/use-collections";
import { textVariants } from "~/lib/typography";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/_default/collections")({
	loader: async ({ context }) => {
		const { queryClient } = context;
		await queryClient.ensureQueryData(convexQuery(api.collections.get, {}));
	},
	component: CollectionsPage,
});

function CollectionsPage() {
	const collections = useCollections();
	const pack1 = collections.filter((col) => col.location === "pack_1");
	const pack2 = collections.filter((col) => col.location === "pack_2");

	return (
		<div className="p-4">
			<HiddenH1>Collections</HiddenH1>
			<div className="space-y-4">
				<PackTable collections={pack1} title="Pack 1" />
				<PackTable collections={pack2} title="Pack 2" />
			</div>
		</div>
	);
}
