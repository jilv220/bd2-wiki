import { type ClassValue, clsx } from "clsx";
import { capitalize, join, map, pipe, round } from "remeda";
import { twMerge } from "tailwind-merge";
import type {
	ElementProperty,
	PotentialBondingStatOption,
	StatOption,
} from "~/hooks/use-characters";

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

	return `${round(n * 100, 2)}%`;
};

export const elementToClassname = (element: ElementProperty) => {
	switch (element) {
		case "fire":
			return "text-[#fb3e39]";
		case "light":
			return "text-[#ffff00]";
		default:
			return "";
	}
};

export const statOptionToAcronym = (
	stat: StatOption | PotentialBondingStatOption,
) => {
	switch (stat) {
		case "crit_dmg":
			return "c.dmg";
		case "crit_rate":
			return "c.r";
		case "magic_atk":
			return "m.atk";
		case "magic_resist":
			return "m.res";
		case "fire_dmg":
		case "water_dmg":
		case "wind_dmg":
		case "light_dmg":
		case "dark_dmg":
			return snakeCaseToText(stat);
		default:
			return stat;
	}
};

export const getImageFromStorageId = (storageId: string) => {
	const imageUrl = new URL(`${CONVEX_SITE_URL}/getImage`);
	imageUrl.searchParams.set("storageId", storageId);
	return imageUrl.href;
};
