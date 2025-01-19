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
import type { Talent } from "~/database.types";
import { useCharacter } from "~/hooks/use-characters";
import { getBuffIconUrl } from "~/lib/utils";

const RankInfo = ({ talent }: { talent: Talent }) => {
	return (
		<div className="rounded-md bg-secondary/20 p-3">
			<div className="flex flex-col items-start justify-between space-y-1">
				<div className="flex flex-col">
					<span className="font-medium text-base">{talent.rank_name}</span>
				</div>
				<div className="flex items-center text-sm">
					<span>{talent.description}</span>
				</div>
			</div>
		</div>
	);
};

const UpgradeDialog = () => {
	const { talents } = useCharacter();
	const [_, ...rest] = talents;

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
				className="w-[85%] rounded-lg sm:max-w-[430px]"
				onOpenAutoFocus={(ev) => ev.preventDefault()}
			>
				<DialogHeader className="font-semibold text-lg">
					Upgrade Effects
				</DialogHeader>
				<div className="space-y-2 pt-4">
					{rest.map((tal) => (
						<RankInfo key={tal.rank_level} talent={tal} />
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export const TalentCard = () => {
	const { talents } = useCharacter();

	return (
		<Card className="w-full">
			<CardHeader className="border-b">
				<h2 className="font-bold text-xl sm:text-2xl">Talent</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<div className="flex flex-col space-y-4">
					{/* Skill Header */}
					<div className="flex items-start space-x-4">
						<div className="relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-lg bg-foreground/35 sm:h-16 sm:w-16 min-[588px]:h-14 min-[588px]:w-14">
							<img
								src={getBuffIconUrl(talents[0].bufficon_id)}
								alt={talents[0].name}
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold text-base sm:text-xl">
									{talents[0].name}
								</h3>
								<UpgradeDialog />
							</div>
							<p className="mt-1 text-muted-foreground text-xs sm:text-base">
								Beginner: {talents[0].description}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
