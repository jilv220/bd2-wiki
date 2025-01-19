import { type ClassValue, clsx } from "clsx";
import { capitalize, concat, join, map, multiply, pipe } from "remeda";
import { twMerge } from "tailwind-merge";
import type { Element } from "~/database.types";

const CONVEX_SITE_URL = import.meta.env.VITE_CONVEX_SITE_URL;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const snakeCaseToText = (str: string) =>
	pipe(
		str.split("_"),
		map((word) => capitalize(word)),
		join(" "),
	);

/**
 * Converts float numbers to percentage text
 * Only transforms numbers between 0 and 1
 * Returns the original number as string for other cases
 */
export const decimalToPercentage = (n: number): string => {
	const hasDecimals = (num: number): boolean => num % 1 !== 0;
	if (!hasDecimals(n) || n < 0 || n > 1) {
		return n.toString();
	}

	return `${n * 100}%`;
};

export const elementToClassname = (element: Element) => {
	switch (element) {
		case "fire":
			return "text-[#fb3e39]";
		default:
			return "";
	}
};

export const getImageFromStorageId = (storageId: string) => {
	const imageUrl = new URL(`${CONVEX_SITE_URL}/getImage`);
	imageUrl.searchParams.set("storageId", storageId);
	return imageUrl.href;
};
