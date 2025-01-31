import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useMediaQuery } from "@uidotdev/usehooks";
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
					<Outlet />
					<SiteFooter />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
