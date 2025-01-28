import { convexQuery } from "@convex-dev/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useState } from "react";
import { pipe } from "remeda";
import { HiddenH1 } from "~/components/hidden-h1";
import { Card } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import {
	type AttackProperty,
	type BaseCharacter,
	type ElementProperty,
	type Rarity,
	useCharacters,
} from "~/hooks/use-characters";
import { useIsMobile } from "~/hooks/use-mobile";

const FilterSection = ({
	attackProperty,
	setAttackProperty,
	rarity,
	setRarity,
	element,
	setElement,
}: {
	attackProperty: AttackProperty | "all";
	setAttackProperty: (val: AttackProperty | "all") => void;
	rarity: Rarity | "all";
	setRarity: (val: Rarity | "all") => void;
	element: ElementProperty | "all";
	setElement: (val: ElementProperty | "all") => void;
}) => {
	return (
		<div className="mb-6 flex w-full flex-col space-y-4 rounded-lg bg-secondary/10 p-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:p-4">
			<div className="space-y-2">
				<h2 className="font-medium text-muted-foreground text-sm">
					Attack Type
				</h2>
				<ScrollArea className="w-full">
					<ToggleGroup
						type="single"
						value={attackProperty}
						onValueChange={(val: AttackProperty | "all") =>
							setAttackProperty(val)
						}
						className="inline-flex justify-start gap-2 pb-2"
					>
						<ToggleGroupItem value="all" className="min-w-16 px-4">
							All
						</ToggleGroupItem>
						<ToggleGroupItem value="physical" className="px-2">
							<img
								alt="physical"
								className="h-6 w-6"
								src="https://cdn.lyuji.dev/property_icon_physical.png"
							/>
						</ToggleGroupItem>
						<ToggleGroupItem value="magic" className="px-2">
							<img
								alt="magic"
								className="h-6 w-6"
								src="https://cdn.lyuji.dev/property_icon_magic.png"
							/>
						</ToggleGroupItem>
					</ToggleGroup>
				</ScrollArea>
			</div>

			<div className="space-y-2">
				<h2 className="font-medium text-muted-foreground text-sm">Element</h2>
				<ScrollArea className="w-full">
					<ToggleGroup
						type="single"
						value={element}
						onValueChange={(val: ElementProperty | "all") => setElement(val)}
						className="inline-flex justify-start gap-2 pb-2"
					>
						<ToggleGroupItem value="all" className="min-w-16 px-4">
							All
						</ToggleGroupItem>
						<ToggleGroupItem value="fire" className="px-2">
							<img
								alt="fire"
								className="h-6 w-6"
								src="https://cdn.lyuji.dev/element_icon_fire.png"
							/>
						</ToggleGroupItem>
						<ToggleGroupItem value="water" className="px-2">
							<img
								alt="water"
								className="h-6 w-6"
								src="https://cdn.lyuji.dev/element_icon_water.png"
							/>
						</ToggleGroupItem>
						<ToggleGroupItem value="wind" className="px-2">
							<img
								alt="wind"
								className="h-6 w-6"
								src="https://cdn.lyuji.dev/element_icon_wind.png"
							/>
						</ToggleGroupItem>
						<ToggleGroupItem value="light" className="px-2">
							<img
								alt="light"
								className="h-6 w-6"
								src="https://cdn.lyuji.dev/element_icon_light.png"
							/>
						</ToggleGroupItem>
						<ToggleGroupItem value="dark" className="px-2">
							<img
								alt="dark"
								className="h-6 w-6"
								src="https://cdn.lyuji.dev/element_icon_dark.png"
							/>
						</ToggleGroupItem>
					</ToggleGroup>
				</ScrollArea>
			</div>

			<div className="space-y-2">
				<h2 className="font-medium text-muted-foreground text-sm">Rarity</h2>
				<ScrollArea className="w-full">
					<ToggleGroup
						type="single"
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
						className="inline-flex justify-start gap-2 pb-2"
					>
						<ToggleGroupItem value="all" className="min-w-16 px-4">
							All
						</ToggleGroupItem>
						<ToggleGroupItem value="5" className="min-w-16 px-4">
							5 ★
						</ToggleGroupItem>
						<ToggleGroupItem value="4" className="min-w-16 px-4">
							4 ★
						</ToggleGroupItem>
						<ToggleGroupItem value="3" className="min-w-16 px-4">
							3 ★
						</ToggleGroupItem>
					</ToggleGroup>
				</ScrollArea>
			</div>
		</div>
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
			preload={isMobile ? "viewport" : "intent"}
			className="group flex flex-col gap-2"
		>
			<Card className="overflow-hidden transition-all hover:ring-2 hover:ring-primary">
				<div className="relative aspect-square">
					<img
						src={character.illust_inven_char_url}
						alt={character.name}
						className="h-full w-full object-cover"
						loading="lazy"
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
		const characters = await queryClient.ensureQueryData(
			convexQuery(api.characters.get, {}),
		);
		return characters;
	},
	component: CharactersPage,
});

function CharactersPage() {
	const characters = useCharacters();
	const isMobile = useIsMobile();

	const [attackProperty, setAttackProperty] = useState<AttackProperty | "all">(
		"all",
	);
	const [element, setElement] = useState<ElementProperty | "all">("all");
	const [rarity, setRarity] = useState<Rarity | "all">("all");

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
	);

	return (
		<div className="w-full max-w-full overflow-hidden">
			<HiddenH1>Character List</HiddenH1>

			<FilterSection
				attackProperty={attackProperty}
				setAttackProperty={setAttackProperty}
				element={element}
				setElement={setElement}
				rarity={rarity}
				setRarity={setRarity}
			/>

			<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
				{derivedCharacters.map((character) => (
					<CharacterCard
						key={character._id}
						character={character}
						isMobile={isMobile}
					/>
				))}
			</div>
		</div>
	);
}
