import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { SiteSidebar } from "~/components/site-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "~/components/ui/sidebar";

export const Route = createFileRoute("/_default")({
	component: DefaultLayout,
});

function DefaultLayout() {
	return (
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
	);
}
