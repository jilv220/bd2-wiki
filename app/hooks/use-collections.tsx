import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "convex/_generated/api";

export function useCollections() {
	const { data: collections } = useSuspenseQuery(
		convexQuery(api.collections.get, {}),
	);
	return collections;
}

export type Collection = ReturnType<typeof useCollections>[0];
export type Collections = Collection[];
