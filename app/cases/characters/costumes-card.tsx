import { RiArrowUpDoubleFill } from "@remixicon/react";
import { nanoid } from "nanoid";
import { Suspense } from "react";
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
import { type SkillUpgrades, useSkill } from "~/hooks/use-skill";
import { textVariants } from "~/lib/typography";
import {
	cn,
	decimalToPercentage,
	elementToClassname,
	snakeCaseToText,
	statOptionToAcronym,
} from "~/lib/utils";

const PotentialItem = ({
	label,
	className,
	children,
}: {
	label: string;
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={cn(
			"flex items-center justify-between rounded-md bg-secondary/35 px-3 py-2",
			className,
		)}
	>
		<span className="text-muted-foreground text-sm sm:text-base">{label}</span>
		{children}
	</div>
);

const CostumeTabTrigger = ({ costume }: { costume: Costume }) => (
	<TabsTrigger
		className="border-2 border-background p-0 data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:bg-secondary"
		value={costume._id}
	>
		<div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-16 lg:h-20 lg:w-20">
			<img
				src={costume.icon_costume_url ?? ""}
				alt={costume.name}
				className="h-full w-full object-cover"
			/>
		</div>
	</TabsTrigger>
);

const SkillPotentials = ({ skills }: { skills: string[] }) => (
	<div className="flex flex-col space-y-2">
		{skills.map((skill, idx) => {
			// Is Range Upgrade
			const children = URL.canParse(skill) ? (
				<div className="h-[30px] w-[30px] border bg-secondary">
					<img
						className="h-full w-full"
						src={skill}
						loading="lazy"
						alt="range upgrade"
					/>
				</div>
			) : (
				<span className="text-sm sm:text-base">{skill}</span>
			);

			return (
				<PotentialItem key={nanoid(idx)} label={`Skill Potential ${idx + 1}`}>
					{children}
				</PotentialItem>
			);
		})}
	</div>
);

const BondingAndPermanentPotentials = ({ costume }: { costume: Costume }) => (
	<div className="flex flex-col justify-between space-y-2 lg:space-y-0">
		<PotentialItem
			className="items-start lg:min-h-[88px]"
			label="Bonding Potential"
		>
			<div className="flex flex-col items-end">
				{entries(costume.potential.bonding).map(([stat, value]) => (
					<span className="text-sm uppercase sm:text-base" key={stat}>
						{statOptionToAcronym(stat)} +{decimalToPercentage(value)}
					</span>
				))}
			</div>
		</PotentialItem>
		<PotentialItem label="Permanent Potential">
			{entries(costume.potential.permanent).map(([stat, value]) => (
				<span key={stat} className="text-sm uppercase sm:text-base">
					{statOptionToAcronym(stat)} +{decimalToPercentage(value)}
				</span>
			))}
		</PotentialItem>
	</div>
);

const SkillUpgradeDialog = ({ upgrades }: { upgrades: SkillUpgrades }) => {
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
				className="max-h-[70svh] w-[85%] rounded-lg sm:max-w-[55svw]"
				onOpenAutoFocus={(ev) => ev.preventDefault()}
			>
				<DialogHeader className="font-semibold text-lg">
					Upgrade Effects
				</DialogHeader>
				<div className="max-h-[56svh] space-y-2 overflow-y-scroll pt-4">
					{upgrades.map((u, idx) => (
						<div
							key={nanoid(idx)}
							className="rounded-md bg-secondary/40 p-3 dark:bg-secondary/30"
						>
							<div className="flex flex-col items-start justify-between space-y-1">
								<div className={cn("flex items-center")}>
									<span className="mr-4 font-semibold">+{idx + 1}</span>
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
	element,
}: {
	costume: Costume;
	element: Character["element_property"]["name"];
}) => {
	const skill = useSkill(costume._id);
	const [base, ...rest] = skill.upgrade;

	return (
		<TabsContent className="mt-0 pl-1" value={costume._id}>
			<div className="flex flex-row items-center">
				<h3 className="py-4 font-semibold text-base sm:text-xl">
					{costume.name}
				</h3>
				{costume.is_limited && (
					<div className="ml-2 inline-flex items-center rounded-full border bg-[#f3da81] px-2.5 py-0.5 font-semibold text-primary-foreground text-xs">
						limited
					</div>
				)}
			</div>
			<div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-8">
				<SkillPotentials skills={costume.potential.skill} />
				<BondingAndPermanentPotentials costume={costume} />
			</div>
			<Separator className="mt-5 mb-6" />
			<div className="flex items-start justify-between pb-2">
				<div className="flex flex-col">
					<div className="flex items-center space-x-2 max-[380px]:space-x-0">
						<div className="ml-[-5px] h-[30px] w-[30px] max-[380px]:hidden sm:h-12 sm:w-12">
							<img
								src={skill.skillicon_url ?? ""}
								alt={skill.name}
								className="h-full w-full"
							/>
						</div>
						<span className={cn(textVariants({ variant: "h3" }))}>
							{skill.name}
						</span>
					</div>
				</div>

				<div className="flex space-x-2">
					<div className="h-[30px] w-[30px] border bg-secondary sm:h-[40px] sm:w-[40px]">
						<img
							loading="lazy"
							className="h-full w-full"
							src={skill.icon_range_url ?? ""}
							alt={skill.icon_range_id}
						/>
					</div>
					<div className="flex h-[30px] w-[30px] items-center justify-center border bg-secondary text-center sm:h-[40px] sm:w-[40px]">
						<span
							className={cn(
								"font-bold text-[8px]",
								elementToClassname(element),
							)}
						>
							{snakeCaseToText(skill.target)}
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
				<h2 className="font-bold text-xl sm:text-2xl" id="costumes">
					Costumes
				</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<Tabs defaultValue={costumes[0]._id}>
					<TabsList className="flex h-auto w-[80svw] justify-start space-x-2 overflow-scroll bg-background sm:w-auto sm:space-x-3">
						{costumes.map((costume) => (
							<CostumeTabTrigger key={costume._id} costume={costume} />
						))}
					</TabsList>
					{/* No need for fallback, always outside viewport */}
					<Suspense>
						{costumes.map((costume) => (
							<CostumeContent
								key={costume._id}
								costume={costume}
								element={element_property.name}
							/>
						))}
					</Suspense>
				</Tabs>
			</CardContent>
		</Card>
	);
};
