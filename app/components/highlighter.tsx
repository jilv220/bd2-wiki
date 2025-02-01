import { nanoid } from "nanoid";
import { cn } from "~/lib/utils";

type HighlightNumbersProps = {
	text: string;
	classname?: string;
};

export const HighlightNumbers = ({
	text,
	classname,
}: HighlightNumbersProps) => {
	const highlightText = (inputText: string) => {
		const numberRegex = /(-?\d*\.?\d+)/g;
		const parts = inputText.split(numberRegex);

		return parts.map((part, idx) => {
			if (part.match(numberRegex)) {
				return (
					<span
						key={nanoid(idx)}
						className="font-medium text-[#fb3e39] dark:text-accent"
					>
						{part}
					</span>
				);
			}
			return part;
		});
	};

	return (
		<div className={cn("break-words", classname)}>{highlightText(text)}</div>
	);
};
