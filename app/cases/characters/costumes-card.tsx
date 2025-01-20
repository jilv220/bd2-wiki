import { RiArrowUpDoubleFill } from "@remixicon/react";
import { nanoid } from "nanoid";
import { entries } from "remeda";
import { HighlightNumbers } from "~/components/highlighter";
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
import {
	type Character,
	type Costume,
	useCharacter,
} from "~/hooks/use-characters";
import { textVariants } from "~/lib/typography";
import {
	cn,
	decimalToPercentage,
	elementToClassname,
	getImageFromStorageId,
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
				src={getImageFromStorageId(costume.icon_costume_id)}
				alt={costume.name}
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

const SkillUpgradeDialog = ({
	upgrades,
}: { upgrades: Costume["skill"]["upgrade"] }) => {
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
				className="max-h-[70%] w-[85%] rounded-lg sm:max-h-none sm:max-w-[768px]"
				onOpenAutoFocus={(ev) => ev.preventDefault()}
			>
				<DialogHeader className="font-semibold text-lg">
					Upgrade Effects
				</DialogHeader>
				<div className="max-h-[392px] space-y-2 overflow-y-scroll pt-4 sm:max-h-[312px] md:max-h-none">
					{upgrades.map((u) => (
						<div
							key={u.level}
							className="rounded-md bg-secondary/40 p-3 dark:bg-secondary/30"
						>
							<div className="flex flex-col items-start justify-between space-y-1">
								<div className={cn("flex items-center")}>
									<span className="mr-4 font-semibold">+{u.level}</span>
									<HighlightNumbers
										classname="mr-2 text-[14px] leading-normal"
										text={`SP${u.sp_cost}`}
									/>
									<HighlightNumbers
										classname="text-[14px] leading-normal"
										text={`CD${u.cd}`}
									/>
								</div>
								<div
									className={cn(
										"flex items-center leading-4",
										textVariants({ variant: "xs" }),
									)}
								>
									<HighlightNumbers text={u.description} />
								</div>
							</div>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

const CostumeContent = ({
	costume,
	allCostumes,
	element,
}: {
	costume: Costume;
	allCostumes: Costume[];
	element: Character["element_property"]["name"];
}) => {
	const [base, ...rest] = costume.skill.upgrade;

	return (
		<TabsContent className="mt-0 pl-1" value={costume.id}>
			<h3 className="py-4 font-semibold text-base sm:text-xl">
				{costume.name}
			</h3>
			<div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:gap-8">
				<SkillPotentials skills={costume.potential.skill} />
				<BondingAndPermanentPotentials costume={costume} />
			</div>
			<Separator className="mt-5 mb-6" />
			<div className="flex items-start justify-between pb-2">
				<div className="flex flex-col">
					<div className="flex items-center space-x-2 max-[380px]:space-x-0">
						<div className="ml-[-5px] h-[30px] w-[30px] max-[380px]:hidden sm:h-12 sm:w-12">
							<img
								src={getImageFromStorageId(costume.skill.skillicon_id)}
								alt={costume.skill.name}
								className="h-full w-full"
							/>
						</div>
						<span className={cn(textVariants({ variant: "h3" }))}>
							{costume.skill.name}
						</span>
					</div>
				</div>

				<div className="flex space-x-2">
					<div className="h-[30px] w-[30px] border bg-secondary sm:h-[40px] sm:w-[40px]">
						<img
							loading="lazy"
							className="h-full w-full"
							src={getImageFromStorageId(costume.skill.icon_range_id)}
							// TODO: need to modify db schema
							alt={"range"}
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
					<span>SP{base.sp_cost}</span>
					<span>CD{base.cd}</span>
				</div>
				<span
					className={cn(textVariants({ variant: "small" }), "pb-1 sm:pb-2")}
				>
					<HighlightNumbers text={base.description} />
				</span>
				<SkillUpgradeDialog upgrades={rest} />
			</div>
		</TabsContent>
	);
};

export const CostumesCard = () => {
	const { costumes, element_property } = useCharacter();

	return (
		<Card className="w-full">
			<CardHeader className="border-b">
				<h2 className="font-bold text-xl sm:text-2xl">Costumes</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<Tabs defaultValue={costumes[0].id}>
					<TabsList className="flex h-auto w-full justify-start gap-2 overflow-x-auto bg-background pb-2 sm:gap-3">
						{costumes.map((costume) => (
							<CostumeTabTrigger key={costume.id} costume={costume} />
						))}
					</TabsList>
					{costumes.map((costume) => (
						<CostumeContent
							key={costume.id}
							costume={costume}
							allCostumes={costumes}
							element={element_property.name}
						/>
					))}
				</Tabs>
			</CardContent>
		</Card>
	);
};
