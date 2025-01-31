import { nanoid } from "nanoid";
import { toKebabCase } from "remeda";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import type { Collections } from "~/hooks/use-collections";
import { textVariants } from "~/lib/typography";
import { cn } from "~/lib/utils";

type PackTableProps = {
	collections: Collections;
	title: string;
};

export const PackTable = ({ collections, title }: PackTableProps) => {
	return (
		<div>
			<h2
				className={cn(textVariants({ variant: "h2" }), "mb-2")}
				id={toKebabCase(title)}
			>
				{title}
			</h2>
			<Table>
				<TableHeader>
					<TableRow className="*:p-3 hover:bg-transparent sm:*:p-2">
						<TableHead className="w-[143px] sm:w-[400px]">Name</TableHead>
						<TableHead className="w-[56px] sm:w-[114px]">Icon</TableHead>
						<TableHead>Acquire</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="text-xs sm:text-sm">
					{collections.map((coll, idx) => (
						<TableRow key={nanoid(idx)} className="*:p-3 sm:*:p-2">
							<TableCell>{coll.name}</TableCell>
							<TableCell>
								<img
									className="h-7 w-7 sm:h-10 sm:w-10"
									src={coll.icon_url}
									alt={coll.name}
									loading="lazy"
								/>
							</TableCell>
							<TableCell>{coll.acquire}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
