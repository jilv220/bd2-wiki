import { nanoid } from "nanoid";
import { entries } from "remeda";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { useCharacter } from "~/hooks/use-characters";
import { textVariants } from "~/lib/typography";
import { cn, decimalToPercentage, getImageFromStorageId } from "~/lib/utils";

const StatItem = ({
	label,
	value,
}: {
	label: string;
	value: string;
}) => (
	<div className="flex items-start justify-between py-2 ">
		<span className="text-muted-foreground text-sm sm:text-base">{label}</span>
		<span className="text-sm uppercase sm:text-base">{value}</span>
	</div>
);

const StatOptionItems = ({
	value,
}: {
	value: string;
}) => (
	<div className="flex items-start justify-between">
		<span className="text-sm uppercase sm:text-base">{value}</span>
	</div>
);

export const ExclusiveGear = () => {
	const { exclusive_gear } = useCharacter();
	const exclusiveAbilityStat = entries(exclusive_gear.exclusive_ability)[0];
	const basicStat = entries(exclusive_gear.basic_stat)[0];
	const statOptions = exclusive_gear.stat_options.map((so) => entries(so)[0]);

	return (
		<Card className="w-full">
			<CardHeader className="border-b pb-4">
				<h2 className="font-bold text-xl sm:text-2xl">Exclusive Gear</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<div className="flex flex-col gap-6 sm:flex-row">
					{/* Character Image */}
					<div className="relative mx-auto h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg sm:mx-0">
						<img
							src={getImageFromStorageId(exclusive_gear.icon_equipment_id)}
							alt={exclusive_gear.name}
							className="h-full w-full object-cover"
						/>
					</div>

					{/* Character Info */}
					<div className="flex-grow space-y-4">
						<h3 className={cn(textVariants({ variant: "h3" }))}>
							{exclusive_gear.name}
						</h3>

						<Separator className="my-4" />

						<div className="space-y-2">
							<StatItem
								label="Exclusive Ability"
								value={`${exclusiveAbilityStat[0]} ${decimalToPercentage(exclusiveAbilityStat[1])}`}
							/>
							<StatItem
								label="Basic Stat"
								value={`${basicStat[0]} ${decimalToPercentage(basicStat[1])}`}
							/>
							<div className="flex items-center justify-between py-2 ">
								<span className="text-muted-foreground text-sm sm:text-base">
									Stat Options
								</span>
								<div className="flex flex-col items-end space-y-1">
									{statOptions.map((so, idx) => (
										<StatOptionItems
											key={nanoid(idx)}
											value={`${so[0]} ${decimalToPercentage(so[1])}`}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
