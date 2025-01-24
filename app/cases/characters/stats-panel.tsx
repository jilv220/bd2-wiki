import { useState } from "react";
import {
	add,
	concat,
	entries,
	evolve,
	map,
	mapToObj,
	multiply,
	pipe,
	unique,
} from "remeda";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
	type ElementProperty,
	type PotentialBondingStatOption,
	useCharacter,
} from "~/hooks/use-characters";
import { textVariants } from "~/lib/typography";
import {
	cn,
	decimalToPercentage,
	hasDecimals,
	statOptionToAcronym,
} from "~/lib/utils";

export function StatsPanel() {
	const {
		stats,
		engraving_stats,
		awaken_stats,
		element_property,
		attack_property,
	} = useCharacter();
	const isPhysical = attack_property.name === "physical";

	const [isAwaken, setAwakenStatus] = useState(false);
	const getStatModifier = (
		stat: number | undefined,
		key: PotentialBondingStatOption,
	) => {
		if (!stat) return add(0);
		if (hasDecimals(stat) && ["hp", "atk", "magic_atk"].includes(key)) {
			return multiply(1 + stat);
		}
		return add(stat);
	};

	const fieldsToChange = pipe(
		entries(engraving_stats),
		concat(entries(awaken_stats)),
		map((entry) => entry[0]),
		(es) => unique(es),
		map((entry) => statOptionToAcronym(entry)),
	);

	// Evolve
	const engravingEvolver = mapToObj(
		entries(engraving_stats),
		([key, value]) => [key, getStatModifier(value, key)],
	);
	const awakenEvolver = mapToObj(entries(awaken_stats), ([key, value]) => [
		key,
		getStatModifier(value, key),
	]);

	const derivedStats = !isAwaken
		? stats
		: pipe(stats, evolve(engravingEvolver), evolve(awakenEvolver));

	// Stats Display
	const baseStatsDisplay = [
		{ label: "hp", value: Math.round(derivedStats.hp) },
		isPhysical
			? { label: "atk", value: Math.round(derivedStats.atk) }
			: { label: "m.atk", value: Math.round(derivedStats.magic_atk) },
		{ label: "c.r", value: decimalToPercentage(derivedStats.crit_rate) },
		{ label: "c.dmg", value: decimalToPercentage(derivedStats.crit_dmg) },
		{ label: "def", value: decimalToPercentage(derivedStats.def) },
		{
			label: "m.res",
			value: decimalToPercentage(derivedStats.magic_resist),
		},
	];

	const elementProperty = element_property.name;
	const getElementStatsDisplay = (elementProperty: ElementProperty) => {
		switch (elementProperty) {
			case "fire":
				return [
					{
						label: "fire dmg",
						value: decimalToPercentage(derivedStats.fire_dmg),
					},
					{
						label: "wind res",
						value: decimalToPercentage(derivedStats.wind_resist),
					},
				];
			case "water":
				return [
					{
						label: "water dmg",
						value: decimalToPercentage(derivedStats.water_dmg),
					},
					{
						label: "fire res",
						value: decimalToPercentage(derivedStats.fire_resist),
					},
				];
			case "light":
				return [
					{
						label: "light dmg",
						value: decimalToPercentage(derivedStats.light_dmg),
					},
					{
						label: "prop. res",
						value: decimalToPercentage(0),
					},
				];
			default:
				return [];
		}
	};

	const statsDisplay = concat(
		baseStatsDisplay,
		getElementStatsDisplay(elementProperty),
	);

	return (
		<Card className="w-full">
			<CardHeader className="flex-row justify-between space-y-0 border-b">
				<h2 className="font-bold text-xl sm:text-2xl" id="stats">
					Base Stats
				</h2>
				<div className="flex items-center space-x-2">
					<Label
						className={cn(
							textVariants({ variant: "small" }),
							"text-muted-foreground sm:text-sm",
						)}
						htmlFor="fully-awakened"
					>
						Fully Awakened
					</Label>
					<Switch
						id="fully-awakened"
						checked={isAwaken}
						onCheckedChange={() => {
							setAwakenStatus(!isAwaken);
						}}
					/>
				</div>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{statsDisplay.map((stat) => (
						<div
							key={stat.label}
							className="mx-1 mt-1 flex flex-col rounded-md bg-secondary/35 px-3 py-2 "
						>
							<span className="text-muted-foreground text-sm uppercase sm:text-base">
								{stat.label}
							</span>
							<span
								className={cn(
									"text-sm sm:text-base",
									isAwaken &&
										fieldsToChange.includes(stat.label) &&
										"text-yellow-300",
								)}
							>
								{stat.value}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
