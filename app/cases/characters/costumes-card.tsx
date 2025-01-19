import { RiArrowUpDoubleFill } from "@remixicon/react";
import { nanoid } from "nanoid";
import { entries } from "remeda";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Costume, Element } from "~/database.types";
import { useCharacter } from "~/hooks/use-characters";
import { textVariants } from "~/lib/typography";
import {
	cn,
	decimalToPercentage,
	elementToClassname,
	getIconCostumeUrl,
	getIconRangeUrl,
	getSkillIconUrl,
} from "~/lib/utils";

const PotentialItem = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<div className="flex items-center justify-between rounded-md bg-secondary/35 px-3 py-2">
		<span className="text-muted-foreground text-sm sm:text-base">{label}</span>
		{children}
	</div>
);

const CostumeTabTrigger = ({ costume }: { costume: Costume }) => (
	<TabsTrigger
		className="border-2 border-background p-0 data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:bg-secondary"
		value={costume.id}
	>
		<div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16 lg:h-20 lg:w-20">
			<img
				src={getIconCostumeUrl(costume.icon_costume_id)}
				alt={costume.costume_name}
				className="h-full w-full object-cover"
			/>
		</div>
	</TabsTrigger>
);

const SkillPotentials = ({ skills }: { skills: string[] }) => (
	<div className="flex flex-col space-y-2">
		{skills.map((skill, idx) => (
			<PotentialItem key={nanoid(idx)} label={`Skill Potential ${idx + 1}`}>
				<span className="text-sm sm:text-base">{skill}</span>
			</PotentialItem>
		))}
	</div>
);

const BondingAndPermanentPotentials = ({ costume }: { costume: Costume }) => (
	<div className="space-y-2">
		<PotentialItem label="Bonding Potential">
			<div className="flex flex-col items-end">
				{entries(costume.potential.bonding).map(([stat, value]) => (
					<span className="text-sm uppercase sm:text-base" key={stat}>
						{stat} +{decimalToPercentage(value)}
					</span>
				))}
			</div>
		</PotentialItem>
		<PotentialItem label="Permanent Potential">
			{entries(costume.potential.permanent).map(([stat, value]) => (
				<span key={stat} className="text-sm uppercase sm:text-base">
					{stat} +{decimalToPercentage(value)}
				</span>
			))}
		</PotentialItem>
	</div>
);

const SkillUpgradeDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="ml-[-8px] h-6 self-start px-2 hover:bg-transparent sm:h-8"
				>
					<RiArrowUpDoubleFill className="text-muted-foreground" size={20} />
					<span className="text-muted-foreground text-sm">View Upgrades</span>
				</Button>
			</DialogTrigger>
			<DialogContent
				className="w-[85%] rounded-lg sm:max-w-[430px]"
				onOpenAutoFocus={(ev) => ev.preventDefault()}
			>
				<DialogHeader className="font-semibold text-lg">
					Upgrade Effects
				</DialogHeader>
				{/* <div className="space-y-2 pt-4"></div> */}
			</DialogContent>
		</Dialog>
	);
};

const CostumeContent = ({
	costume,
	allCostumes,
	element,
}: { costume: Costume; allCostumes: Costume[]; element: Element }) => {
	const upgrades = allCostumes.filter(
		(ac) => ac.costume_name === costume.costume_name,
	);

	return (
		<TabsContent className="mt-0 pl-1" value={costume.id}>
			<h3 className="py-4 font-semibold text-base sm:text-xl">
				{costume.costume_name}
			</h3>
			<div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:gap-8">
				<SkillPotentials skills={costume.potential.skill} />
				<BondingAndPermanentPotentials costume={costume} />
			</div>
			<Separator className="mt-5 mb-6" />
			<div className="flex items-start justify-between pb-2">
				<div className="flex flex-col">
					<div className="flex items-center space-x-2">
						<div className="ml-[-5px] h-[30px] w-[30px] sm:h-12 sm:w-12">
							<img
								src={getSkillIconUrl(costume.skillicon_id)}
								alt={costume.skill_name}
								className="h-full w-full"
							/>
						</div>
						<span className={cn(textVariants({ variant: "h3" }))}>
							{costume.skill_name}
						</span>
					</div>
				</div>

				<div className="flex space-x-2">
					<div className="h-[30px] w-[30px] border bg-secondary sm:h-[40px] sm:w-[40px]">
						<img
							loading="lazy"
							className="h-full w-full"
							src={getIconRangeUrl(costume.icon_range_id)}
							alt={costume.icon_range_id}
						/>
					</div>
					<div className="flex h-[30px] w-[30px] items-center justify-center border bg-secondary text-center sm:h-[40px] sm:w-[40px]">
						<span
							className={cn(
								"font-bold text-[8px]",
								elementToClassname(element),
							)}
						>
							Very Front
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div
					className={cn(textVariants(), "mb-1 space-x-2 text-muted-foreground")}
				>
					<span>SP{costume.sp_cost}</span>
					<span>CD{costume.cooldown}</span>
				</div>
				<span className="pb-1 text-xs sm:pb-2 sm:text-base">
					{costume.description}
				</span>
				<SkillUpgradeDialog />
			</div>
		</TabsContent>
	);
};

export const CostumesCard = () => {
	const { core, costumes } = useCharacter();
	const baseCostumes = costumes.filter((co) => co.level === 0);

	if (!baseCostumes.length) return null;

	return (
		<Card className="w-full">
			<CardHeader className="border-b">
				<h2 className="font-bold text-xl sm:text-2xl">Costumes</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<Tabs defaultValue={baseCostumes[0].id}>
					<TabsList className="flex h-auto w-full justify-start gap-2 overflow-x-auto bg-background pb-2 sm:gap-3">
						{baseCostumes.map((costume) => (
							<CostumeTabTrigger key={costume.id} costume={costume} />
						))}
					</TabsList>
					{baseCostumes.map((costume) => (
						<CostumeContent
							key={costume.id}
							costume={costume}
							allCostumes={costumes}
							element={core.element_property}
						/>
					))}
				</Tabs>
			</CardContent>
		</Card>
	);
};
