import { Link, createFileRoute } from "@tanstack/react-router";
import { useCharacters } from "~/hooks/use-characters";

export const Route = createFileRoute("/_default/characters/")({
	component: CharactersPage,
});

function CharactersPage() {
	const characters = useCharacters();

	return (
		<>
			{characters.map((chr) => (
				<ul key={chr.id_char}>
					<Link
						className="capitalize"
						from={Route.fullPath}
						to="./$name"
						params={{ name: chr.char_name }}
					>
						{chr.char_name}
					</Link>
				</ul>
			))}
		</>
	);
}
