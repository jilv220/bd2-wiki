import type { ParseRoute } from "@tanstack/react-router";
import { ConvexHttpClient } from "convex/browser";
import type { Sitemap } from "tanstack-router-sitemap";
import type { routeTree } from "~/routeTree.gen";
import { api } from "../../convex/_generated/api";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env.VITE_CONVEX_URL!);

// This will become a string literal union of all your routes
type MyRoutes = ParseRoute<typeof routeTree>["fullPath"];

// Define your sitemap
export const sitemap: Sitemap<MyRoutes> = {
	siteUrl: process.env.SITE_URL!,
	defaultPriority: 0.5,
	routes: {
		"/": {
			priority: 1,
			changeFrequency: "daily",
		},
		"/characters": {
			priority: 0.9,
			changeFrequency: "daily",
		},
		"/characters/$name": async () => {
			const characters = await client.query(api.characters.get);
			return characters.map((char) => ({
				path: `/characters/${char.name}`,
				priority: 0.8,
				changeFrequency: "daily",
			}));
		},
	},
};
