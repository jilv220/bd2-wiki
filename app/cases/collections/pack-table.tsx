import { ChevronDown, ChevronsDown } from "lucide-react";
import { nanoid } from "nanoid";
import { toKebabCase } from "remeda";
import { Button } from "~/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "~/components/ui/collapsible";
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
		<Collapsible defaultOpen>
			<div className="flex items-center">
				<CollapsibleTrigger>
					<h2
						className={cn(textVariants({ variant: "h2" }), "mr-1")}
						id={toKebabCase(title)}
					>
						{title}
					</h2>
				</CollapsibleTrigger>

				<CollapsibleTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="w-9 p-0 transition duration-300 ease-quint hover:bg-transparent hover:text-foreground data-[state=open]:rotate-180"
					>
						<ChevronDown className="h-4 w-4" />
						<span className="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>

			<CollapsibleContent>
				<Table>
					<TableHeader>
						<TableRow className="*:p-2 hover:bg-transparent sm:*:p-1">
							<TableHead className="w-[143px] sm:w-[400px]">Name</TableHead>
							<TableHead className="w-[55px] sm:w-[114px]">Icon</TableHead>
							<TableHead>Acquire</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="text-xs sm:text-sm">
						{collections.map((coll, idx) => (
							<TableRow key={nanoid(idx)} className="*:p-2 sm:*:p-1">
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
			</CollapsibleContent>
		</Collapsible>
	);
};
