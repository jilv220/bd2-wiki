import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_default/")({
	component: Home,
});

function Home() {
	return <div>Home</div>;
}
