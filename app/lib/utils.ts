import { type ClassValue, clsx } from "clsx";
import { capitalize, concat, join, map, multiply, pipe } from "remeda";
import { twMerge } from "tailwind-merge";
import type { Element } from "~/database.types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

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

type FileExt = "png" | "webp";

export function getStoragePublicUrl(bucketId: string, path: string): string {
	return `${SUPABASE_URL}/storage/v1/object/public/${bucketId}/${path}`;
}

export function getInventoryIllustUrl(
	id: string,
	ext: FileExt = "png",
): string {
	return getStoragePublicUrl("illust_inven_char", `${id}.${ext}`);
}

export function getIconMiscUrl(id: string, ext: FileExt = "png"): string {
	return getStoragePublicUrl("icon_misc", `${id}.${ext}`);
}

export function getIconCostumeUrl(id: string, ext: FileExt = "png"): string {
	return getStoragePublicUrl("icon_costume", `${id}.${ext}`);
}

export function getIconRangeUrl(id: string, ext: FileExt = "webp"): string {
	return getStoragePublicUrl("icon_range", `${id}.${ext}`);
}

export function getBuffIconUrl(id: string, ext: FileExt = "png"): string {
	return getStoragePublicUrl("bufficon", `${id}.${ext}`);
}

export function getSkillIconUrl(id: string, ext: FileExt = "png"): string {
	return getStoragePublicUrl("skillicon", `${id}.${ext}`);
}

export function getCharactersDataUrl() {
	return getStoragePublicUrl("characters", "data.json");
}
