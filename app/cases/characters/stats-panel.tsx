import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useCharacter } from "~/hooks/use-characters";
import { decimalToPercentage, snakeCaseToText } from "~/lib/utils";

export function StatsPanel() {
	const character = useCharacter();

	const stats = [
		{ label: "hp", value: character.stats.hp },
		{ label: "atk", value: character.stats.atk },
		{ label: "m.atk", value: character.stats.magic_atk },
		{ label: "c.r", value: decimalToPercentage(character.stats.crit_rate) },
		{ label: "c.dmg", value: decimalToPercentage(character.stats.crit_dmg) },
		{ label: "def", value: decimalToPercentage(character.stats.def) },
		{
			label: "m.res",
			value: decimalToPercentage(character.stats.magic_resist),
		},
		{ label: "kb", value: snakeCaseToText(character.knock_back) },
	];

	return (
		<Card className="w-full">
			<CardHeader className="border-b">
				<h2 className="font-bold text-xl sm:text-2xl">Base Stats</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
					{stats.map((stat) => (
						<div
							key={stat.label}
							className="mx-1 mt-1 flex flex-col rounded-md bg-secondary/35 px-3 py-2 "
						>
							<span className="text-muted-foreground text-sm uppercase sm:text-base">
								{stat.label}
							</span>
							<span className="text-sm sm:text-base">{stat.value}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
