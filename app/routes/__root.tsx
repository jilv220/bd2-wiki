import {
	Outlet,
	ScrollRestoration,
	createRootRoute,
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

export const Route = createRootRoute({
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
				title: "TanStack Start Starter",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
});

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
						<main className="container mx-auto px-6 py-6 sm:px-4 md:px-4">
							<Outlet />
						</main>
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
