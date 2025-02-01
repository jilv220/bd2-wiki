import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Scroller } from "~/components/scroller";

export const Route = createFileRoute("/_default/collections")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative">
			<Outlet />
			<Scroller />
		</div>
	);
}
