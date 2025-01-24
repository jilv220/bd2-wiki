import { Link, createFileRoute } from "@tanstack/react-router";
import { HiddenH1 } from "~/components/hidden-h1";
import { useCharacters } from "~/hooks/use-characters";
import { useIsMobile } from "~/hooks/use-mobile";

export const Route = createFileRoute("/characters/")({
	component: CharactersPage,
});

function CharactersPage() {
	const characters = useCharacters();
	const isMobile = useIsMobile();

	return (
		<>
			<HiddenH1>Characters</HiddenH1>
			{characters.map((chr) => (
				<ul key={chr._id}>
					<Link
						className="capitalize"
						from={Route.fullPath}
						to="./$name"
						params={{ name: chr.name }}
						preload={isMobile ? "viewport" : "intent"}
					>
						{chr.name}
					</Link>
				</ul>
			))}
		</>
	);
}
