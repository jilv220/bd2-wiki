import type { QueryClient } from "@tanstack/react-query";
import {
	ErrorComponent,
	Outlet,
	ScrollRestoration,
	createRootRoute,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { SiteSidebar } from "~/components/site-sidebar";
import { ThemeProvider } from "~/components/theme-provider";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "~/components/ui/sidebar";

import appCss from "~/styles/app.css?url";

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
			{
				title: "Brown Dust 2 Wiki",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
	errorComponent: ({ error }) => <>Unknwon error: {error.message}</>,
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
		<html lang="en" suppressHydrationWarning>
			<head>
				<Meta />
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
					scriptProps={{ "data-cfasync": "false" }}
				>
					{children}
					<ScrollRestoration />
					<Scripts />
				</ThemeProvider>
			</body>
		</html>
	);
}
