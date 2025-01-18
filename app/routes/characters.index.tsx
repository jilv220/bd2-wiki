import { Link, createFileRoute } from "@tanstack/react-router";
import { useCharacters } from "~/hooks/use-characters";

export const Route = createFileRoute("/characters/")({
	component: CharactersPage,
});

function CharactersPage() {
	const characters = useCharacters();

	return (
		<>
			{characters.map((chr) => (
				<ul key={chr.id}>
					<Link
						className="capitalize"
						from={Route.fullPath}
						to="./$name"
						params={{ name: chr.name }}
					>
						{chr.name}
					</Link>
				</ul>
			))}
		</>
	);
}
