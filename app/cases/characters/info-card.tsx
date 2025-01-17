import { getRouteApi, useParams } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useCharacter } from "~/hooks/use-characters";
import {
	getIconMiscUrl,
	getInventoryIllustUrl,
	snakeCaseToText,
} from "~/lib/utils";

type CharacterCardItemProp = {
	label: string;
	children: React.ReactNode;
};

function InfoCardItem({ label, children }: CharacterCardItemProp) {
	return (
		<div className="mx-1 mt-1 flex items-center justify-between rounded-md bg-secondary/35 px-3 py-2">
			<span className="text-muted-foreground text-sm sm:text-base">
				{label}
			</span>
			{children}
		</div>
	);
}

export function InfoCard() {
	const routeApi = getRouteApi("/characters/$name");
	const { name } = routeApi.useParams();
	const character = useCharacter(name);

	return (
		<Card className="w-full">
			<CardHeader className="border-b">
				<h2 className="font-bold text-xl sm:text-2xl">Basic Info</h2>
			</CardHeader>
			<CardContent className="p-4 sm:p-6">
				<div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
					{/* Character Image Section */}
					<div className="relative mx-auto h-40 w-40 flex-shrink-0 sm:mx-0 sm:h-48 sm:w-48">
						<div className="absolute inset-0 overflow-hidden rounded-lg">
							<img
								src={getInventoryIllustUrl(character.illust_inven_char_id)}
								alt={name}
								className="h-full w-full object-cover"
							/>
							<div className="absolute top-1 right-1 text-yellow-400">
								{"★".repeat(character.rarity)}
							</div>
						</div>
					</div>

					{/* Character Info Section */}
					<div className="flex flex-grow flex-col text-base sm:text-lg">
						<div className="pb-2 text-center sm:pb-3 sm:text-left">
							<span className="font-bold text-lg capitalize sm:text-xl">
								{character.char_name}
							</span>
						</div>
						<div className="grid flex-grow grid-cols-1 gap-2 sm:grid-cols-2">
							<InfoCardItem label="Rarity">
								<span className="text-sm capitalize sm:text-base">
									{character.rarity}
								</span>
							</InfoCardItem>
							<InfoCardItem label="Element Property">
								<img
									src={getIconMiscUrl(character.element_property.icon_misc_id)}
									alt={character.element_property.name}
									className="mr-[-5px] h-5 w-5 object-cover sm:h-6 sm:w-6"
								/>
							</InfoCardItem>
							<InfoCardItem label="Attack Property">
								<span className="text-sm capitalize sm:text-base">
									{character.attack_property.name}
								</span>
							</InfoCardItem>
							<InfoCardItem label="Target">
								<span className="text-sm capitalize sm:text-base">
									{snakeCaseToText(character.target)}
								</span>
							</InfoCardItem>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
