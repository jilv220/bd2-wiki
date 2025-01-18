import { entries } from "remeda";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useCharacter } from "~/hooks/use-characters";
import { decimalToPercentage, getIconCostume } from "~/lib/utils";

export const CostumesCard = () => {
	const { costumes } = useCharacter();
	const lv0Costumes = costumes.filter((co) => co.level === 0);

	return (
		<Card className="w-full">
			<CardHeader className="border-b">
				<h2 className="font-bold text-xl sm:text-2xl">Costumes</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<Tabs defaultValue={lv0Costumes[0].id}>
					<TabsList className="flex h-auto w-[80svw] justify-start space-x-2 overflow-scroll bg-background sm:w-auto sm:space-x-3">
						{lv0Costumes.map((co) => (
							<TabsTrigger
								// biome-ignore lint/nursery/useSortedClasses: <explanation>
								className="p-0 
								border-2 border-background data-[state=active]:border-2 data-[state=active]:border-primary 
								data-[state=active]:bg-secondary"
								value={co.id}
								key={co.id}
							>
								<div className="relative h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-20 min-[588px]:h-14 min-[588px]:w-14">
									<img
										src={getIconCostume(co.icon_costume_id)}
										alt={co.costume_name}
										className="h-full w-full object-cover"
									/>
								</div>
							</TabsTrigger>
						))}
					</TabsList>
					{/* Tab Contents */}
					{lv0Costumes.map((co) => (
						<TabsContent className="mt-0 pl-1" value={co.id} key={co.id}>
							<h3 className="pt-[22px] pb-[19px] font-semibold text-base sm:text-xl">
								{co.costume_name}
							</h3>
							<div className="flex flex-col space-y-3 sm:grid sm:grid-cols-2 sm:gap-8 sm:space-y-0">
								<div className="flex flex-col space-y-2">
									{co.potential.skill.map((s, idx) => (
										<div
											className="flex items-center justify-between rounded-md bg-secondary/35 px-3 py-2"
											key={s}
										>
											<span className="text-muted-foreground text-sm sm:text-base">
												Skill Potential {idx + 1}
											</span>
											<span className="text-sm sm:text-base">{s}</span>
										</div>
									))}
								</div>
								<div>
									<div className="flex items-center justify-between rounded-md bg-secondary/35 px-3 py-2">
										<span className="text-muted-foreground text-sm sm:text-base">
											Bonding Potential
										</span>
										<div className="flex flex-col">
											{entries(co.potential.bonding).map((bd) => (
												<span
													className="text-sm uppercase sm:text-base"
													key={bd[0]}
												>
													{bd[0]} +{decimalToPercentage(bd[1])}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</TabsContent>
					))}
				</Tabs>
			</CardContent>
		</Card>
	);
};
