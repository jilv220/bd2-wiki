import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_default/")({
	component: Home,
});

function Home() {
	return (
		<div className="container mx-auto px-4 py-4">
			<h1>Home</h1>
		</div>
	);
}
