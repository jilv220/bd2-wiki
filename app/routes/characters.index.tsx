import { convexQuery } from "@convex-dev/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { pipe } from "remeda";
import {
	FilterContainer,
	FilterSection,
} from "~/cases/characters/filter-section";
import { HiddenH1 } from "~/components/hidden-h1";
import { Card } from "~/components/ui/card";
import {
	type BaseCharacter,
	type Rarity,
	useCharacters,
} from "~/hooks/use-characters";
import { useIsMobile } from "~/hooks/use-mobile";
import { snakeCaseToText } from "~/lib/utils";
import { useCharacterFilterStore } from "~/stores/character-filter-store";

const CharacterFilters = () => {
	const {
		attackProperty,
		element,
		rarity,
		target,
		setAttackProperty,
		setElement,
		setRarity,
		setTarget,
	} = useCharacterFilterStore();

	const attackOptions = [
		{ value: "all", label: "All" },
		{
			value: "physical",
			iconUrl: "https://cdn.lyuji.dev/property_icon_physical.png",
		},
		{
			value: "magic",
			iconUrl: "https://cdn.lyuji.dev/property_icon_magic.png",
		},
	];

	const elementOptions = [
		{ value: "all", label: "All" },
		{ value: "fire", iconUrl: "https://cdn.lyuji.dev/element_icon_fire.png" },
		{ value: "water", iconUrl: "https://cdn.lyuji.dev/element_icon_water.png" },
		{ value: "wind", iconUrl: "https://cdn.lyuji.dev/element_icon_wind.png" },
		{ value: "light", iconUrl: "https://cdn.lyuji.dev/element_icon_light.png" },
		{ value: "dark", iconUrl: "https://cdn.lyuji.dev/element_icon_dark.png" },
	];

	const rarityOptions = [
		{ value: "all", label: "All" },
		{ value: "5", label: "5 ★" },
		{ value: "4", label: "4 ★" },
		{ value: "3", label: "3 ★" },
	];

	const targetOptions = [
		{ value: "all", label: "All" },
		{ value: "very_front", label: snakeCaseToText("very_front") },
		{ value: "vault", label: snakeCaseToText("vault") },
	];

	return (
		<FilterContainer>
			<FilterSection
				title="Attack Type"
				value={attackProperty}
				onValueChange={(val) => setAttackProperty(val)}
				options={attackOptions}
			/>
			<FilterSection
				title="Element"
				value={element}
				onValueChange={(val) => setElement(val)}
				options={elementOptions}
			/>
			<FilterSection
				title="Rarity"
				value={rarity.toString()}
				onValueChange={(val) => {
					switch (val) {
						case "5":
						case "4":
						case "3":
							setRarity(Number.parseInt(val) as Rarity);
							break;
						default:
							setRarity("all");
					}
				}}
				options={rarityOptions}
			/>
			<FilterSection
				title="Target"
				value={target}
				onValueChange={(val) => setTarget(val)}
				options={targetOptions}
			/>
		</FilterContainer>
	);
};

const CharacterCard = ({
	character,
	isMobile,
}: {
	character: BaseCharacter;
	isMobile: boolean;
}) => {
	return (
		<Link
			from="/characters/"
			to="./$name"
			params={{ name: character.name }}
			className="group flex flex-col gap-1.5 sm:gap-2"
		>
			<Card className="overflow-hidden transition-all hover:ring-2 hover:ring-primary">
				<div className="relative aspect-square">
					<img
						src={character.illust_inven_char_url}
						alt={character.name}
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-background/90 to-background/0 p-1">
						<div className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
							<img
								src={character.element_property.icon_misc_url}
								alt={character.element_property.name}
								className="h-full w-full"
							/>
						</div>
						<div className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
							<img
								src={character.attack_property.icon_misc_url}
								alt={character.attack_property.name}
								className="h-full w-full"
							/>
						</div>
					</div>
				</div>
			</Card>
			<h3 className="truncate text-center font-medium text-xs capitalize sm:text-sm">
				{character.name}
			</h3>
		</Link>
	);
};

export const Route = createFileRoute("/characters/")({
	loader: async ({ context }) => {
		const { queryClient } = context;
		await queryClient.prefetchQuery(convexQuery(api.characters.get, {}));
	},
	component: CharactersPage,
});

function CharactersPage() {
	const characters = useCharacters();
	const isMobile = useIsMobile();
	const { attackProperty, element, rarity, target } = useCharacterFilterStore();

	const filterCharacters =
		<T,>(value: T | "all") =>
		(selector: (char: BaseCharacter) => T) =>
		(characters: ReturnType<typeof useCharacters>) => {
			if (value === "all") return characters;
			return characters.filter((char) => selector(char) === value);
		};

	const derivedCharacters = pipe(
		characters,
		filterCharacters(attackProperty)((char) => char.attack_property.name),
		filterCharacters(element)((char) => char.element_property.name),
		filterCharacters(rarity)((char) => char.rarity),
		filterCharacters(target)((char) => char.target),
	);

	return (
		<>
			<HiddenH1>Character List</HiddenH1>
			<CharacterFilters />
			<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
				{derivedCharacters.map((character) => (
					<CharacterCard
						key={character._id}
						character={character}
						isMobile={isMobile}
					/>
				))}
			</div>
		</>
	);
}
