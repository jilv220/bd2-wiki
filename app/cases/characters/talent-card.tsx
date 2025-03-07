import { ChevronRight } from "lucide-react";
import { nanoid } from "nanoid";
import { HighlightNumbers } from "~/components/highlighter";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "~/components/ui/dialog";
import { type TalentRank, useCharacter } from "~/hooks/use-characters";
import { textVariants } from "~/lib/typography";
import { cn, getImageFromStorageId } from "~/lib/utils";

const RankInfo = ({ rank }: { rank: TalentRank }) => {
	return (
		<div className="rounded-md bg-secondary/40 p-3 dark:bg-secondary/30">
			<div className="flex flex-col items-start justify-between space-y-1">
				<div className="flex flex-col">
					<span className="font-medium text-base">{rank.name}</span>
				</div>
				<div className="flex items-center text-sm">
					<HighlightNumbers text={rank.description} />
				</div>
			</div>
		</div>
	);
};

const UpgradeDialog = () => {
	const { talent } = useCharacter();
	const [_, ...rest] = talent.ranks;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="h-6 px-2 hover:bg-transparent sm:h-8"
				>
					<span className="hidden text-muted-foreground text-sm sm:block">
						View Upgrades
					</span>
					<ChevronRight className="ml-1 h-4 w-4 text-muted-foreground" />
				</Button>
			</DialogTrigger>
			<DialogContent
				className="max-h-[70svh] w-[85%] rounded-lg sm:max-w-[55svw]"
				onOpenAutoFocus={(ev) => ev.preventDefault()}
			>
				<DialogHeader className="font-semibold text-lg">
					Upgrade Effects
				</DialogHeader>
				<div className="max-h-[56svh] space-y-2 overflow-y-scroll pt-4">
					{rest.map((r, idx) => (
						<RankInfo key={nanoid(idx)} rank={r} />
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export const TalentCard = () => {
	const { talent } = useCharacter();

	return (
		<Card className="w-full">
			<CardHeader className="border-b">
				<h2 className="font-bold text-xl sm:text-2xl" id="talent">
					Talent
				</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<div className="flex flex-col space-y-4">
					{/* Skill Header */}
					<div className="flex items-start space-x-4">
						<div className="relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-lg bg-foreground/35 sm:h-16 sm:w-16 min-[588px]:h-14 min-[588px]:w-14">
							<img
								src={talent.bufficon_url ?? ""}
								alt={talent.name}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold text-base sm:text-xl">
									{talent.name}
								</h3>
								<UpgradeDialog />
							</div>
							<p
								className={cn(
									textVariants({ variant: "small" }),
									"mt-1 text-muted-foreground",
								)}
							>
								Beginner: {talent.ranks[0].description}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
