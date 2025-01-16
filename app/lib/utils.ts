import { type ClassValue, clsx } from "clsx";
import { capitalize, join, map, pipe } from "remeda";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const snakeCaseToText = (str: string) =>
	pipe(
		str.split("_"),
		map((word) => capitalize(word)),
		join(" "),
	);
