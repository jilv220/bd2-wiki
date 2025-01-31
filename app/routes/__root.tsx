import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { SiteHeader } from "~/components/site-header";
import { seo } from "~/lib/seo";

import appCss from "~/styles/app.css?url";

export const SITE_TITLE = "Brown Dust 2 Wiki";
export const rootSeo = seo({
	title: SITE_TITLE,
	description:
		"Comprehensive wiki for Brown Dust 2 featuring detailed character information, equipment stats, and map information for players.",
	keywords:
		"Brown Dust 2, BrownDust 2, browndust2, browndust 2, wiki, database, game wiki, character info, equiments, game guides, mobile games",
	image: "https://bd2-wiki.lyuji.dev/Brown-Dust-2-Key-Art.jpg",
});

// Type RouterContext here, and pass initial data in router.tsx
interface AppRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...rootSeo,
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
	errorComponent: ({ error }) => <>Unknwon error: {error.message}</>,
	notFoundComponent: () => (
		<>
			<SiteHeader>
				<div className="pr-3" />
			</SiteHeader>
			<main className="mx-3 p-4">
				The page you are looking for is not found.
			</main>
		</>
	),
});

// Just define the default outlet here
function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning className="dark">
			<head>
				<Meta />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
