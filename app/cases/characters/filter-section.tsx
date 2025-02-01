import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";

type FilterOption = {
	value: string;
	label?: string;
	iconUrl?: string;
};

type FilterSectionProps<T extends string> = {
	title: string;
	value: T;
	onValueChange: (value: T) => void;
	options: FilterOption[];
	className?: string;
};

export const FilterSection = <T extends string>({
	title,
	value,
	onValueChange,
	options,
	className,
}: FilterSectionProps<T>) => {
	return (
		<div className="w-full space-y-2">
			<h2 className="font-medium text-muted-foreground text-xs sm:text-sm">
				{title}
			</h2>
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={onValueChange}
				className="flex flex-wrap justify-start gap-1.5 sm:gap-2"
			>
				{options.map((option) => (
					<ToggleGroupItem
						key={option.value}
						value={option.value}
						className={
							option.iconUrl
								? "h-8 px-1.5 sm:h-10 sm:px-2"
								: "h-8 px-3 text-xs sm:h-10 sm:px-4 sm:text-sm"
						}
					>
						{option.iconUrl ? (
							<img
								alt={option.value}
								className={cn(
									"h-5 w-5 sm:h-6 sm:w-6",
									value === option.value && "brightness-[0.15]",
								)}
								src={option.iconUrl}
							/>
						) : (
							option.label || option.value
						)}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
};

export const FilterContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"mb-4 flex flex-col items-start space-y-3 rounded-lg bg-secondary/25 p-2 sm:mb-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0 sm:p-6",
				className,
			)}
		>
			{children}
		</div>
	);
};
