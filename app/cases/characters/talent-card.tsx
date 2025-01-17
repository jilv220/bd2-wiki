import { getRouteApi } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { useCharacter } from "~/hooks/use-characters";
import { getBuffIconUrl } from "~/lib/utils";
import type { Talent, TalentRank, TalentRankLevel } from "./types";

const getDescriptionByTalentRankLvl = (
	talent: Talent,
	lvl: TalentRankLevel,
) => {
	const rank = talent.ranks[lvl - 1];
	return talent.description_template.replace(
		"${rank_value}",
		rank.rank_value.toString(),
	);
};

const RankInfo = ({ rank }: { rank: TalentRank }) => {
	return (
		<div className="rounded-md bg-secondary/20 p-3">
			<div className="flex items-center justify-between">
				<div className="flex flex-col">
					<span className="font-medium">{rank.name}</span>
				</div>
				<div className="flex items-center space-x-4 text-sm">
					<span>Duration: {rank.rank_value}s</span>
				</div>
			</div>
		</div>
	);
};

const UpgradeDialog = ({ talent }: { talent: Talent }) => {
	const [_, ...restRanks] = talent.ranks;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost" className="h-6 px-2 sm:h-8">
					<span className="hidden text-muted-foreground text-sm sm:block">
						View Upgrades
					</span>
					<ChevronRight className="ml-1 h-4 w-4 text-muted-foreground" />
				</Button>
			</DialogTrigger>
			<DialogContent
				className="w-[80%] rounded-lg sm:max-w-[425px]"
				onOpenAutoFocus={(ev) => ev.preventDefault()}
			>
				<DialogHeader className="font-semibold text-lg">
					Upgrade Effects
				</DialogHeader>
				<div className="space-y-2 pt-4">
					{restRanks.map((rank) => (
						<RankInfo key={rank.level} rank={rank} />
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export const TalentCard = () => {
	const routeApi = getRouteApi("/characters/$name");
	const { name } = routeApi.useParams();
	const character = useCharacter(name);

	return (
		<Card className="w-full">
			<CardHeader className="border-b">
				<h2 className="font-bold text-xl sm:text-2xl">Talent</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<div className="flex flex-col space-y-4">
					{/* Skill Header */}
					<div className="flex items-start space-x-4">
						<div className="relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16 min-[588px]:h-14 min-[588px]:w-14">
							<img
								src={getBuffIconUrl(character.talent.bufficon_id)}
								alt={character.talent.name}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold text-base sm:text-xl">
									{character.talent.name}
								</h3>
								<UpgradeDialog talent={character.talent} />
							</div>
							<p className="mt-1 text-muted-foreground text-xs sm:text-base">
								Beginner: {getDescriptionByTalentRankLvl(character.talent, 1)}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
