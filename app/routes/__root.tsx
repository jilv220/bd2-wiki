import type { QueryClient } from "@tanstack/react-query";
import {
	Outlet,
	ScrollRestoration,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { SiteSidebar } from "~/components/site-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "~/components/ui/sidebar";
import { seo } from "~/lib/seo";

import appCss from "~/styles/app.css?url";

export const SITE_TITLE = "Brown Dust 2 Wiki";
export const rootSeo = seo({
	title: SITE_TITLE,
	description:
		"A wiki/database website for game Brown Dust 2, providing detailed information about characters, equipment, maps and other in-game content to help players easily access game information.",
	keywords:
		"Brown Dust 2, BrownDust 2, browndust2, browndust 2, wiki, database, game wiki, character info, equiments, game guides, mobile games",
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
	notFoundComponent: () => <>Not Found</>,
});

// Just define the default outlet here
function RootComponent() {
	return (
		<RootDocument>
			<SidebarProvider>
				<SiteSidebar />
				<SidebarInset>
					<div className="relative flex min-h-screen flex-col">
						<SiteHeader>
							<SidebarTrigger className="ml-1 h-10 w-10 text-primary" />
						</SiteHeader>
						<div className="container mx-auto px-4 py-4">
							<Outlet />
						</div>
						<SiteFooter />
					</div>
				</SidebarInset>
			</SidebarProvider>
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
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
