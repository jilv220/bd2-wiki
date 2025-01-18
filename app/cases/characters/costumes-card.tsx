import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useCharacter } from "~/hooks/use-characters";
import { getIconCostume } from "~/lib/utils";

export const CostumesCard = () => {
	const character = useCharacter();
	const costumes = character.costumes;

	return (
		<Card className="w-full">
			<CardHeader className="border-b">
				<h2 className="font-bold text-xl sm:text-2xl">Costumes</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<Tabs defaultValue={costumes[0].id_costume}>
					<TabsList className="flex h-auto w-[80svw] justify-start space-x-2 overflow-scroll bg-background sm:w-auto sm:space-x-3">
						{costumes.map((co) => (
							<TabsTrigger
								// biome-ignore lint/nursery/useSortedClasses: <explanation>
								className="p-0 
								border-2 border-background data-[state=active]:border-2 data-[state=active]:border-primary 
								data-[state=active]:bg-secondary"
								value={co.id_costume}
								key={co.id_costume}
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
					{costumes.map((co) => (
						<TabsContent
							className="pt-[22px] pb-[19px]"
							value={co.id_costume}
							key={co.id_costume}
						>
							<h3 className="font-semibold text-base sm:text-xl">
								{co.costume_name}
							</h3>
							<div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
								{co.potential.skill.map((s) => (
									<span key={s}>{s}</span>
								))}
							</div>
						</TabsContent>
					))}
				</Tabs>
			</CardContent>
		</Card>
	);
};
