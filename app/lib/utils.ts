import { type ClassValue, clsx } from "clsx";
import { capitalize, join, map, pipe } from "remeda";
import { twMerge } from "tailwind-merge";

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

export function getStoragePublicUrl(bucketId: string, path: string): string {
	return `${SUPABASE_URL}/storage/v1/object/public/${bucketId}/${path}`;
}

export function getInventoryIllustUrl(id: string, ext: "png" = "png"): string {
	return getStoragePublicUrl("illust_inven_char", `${id}.${ext}`);
}

export function getIconMiscUrl(id: string, ext: "png" = "png"): string {
	return getStoragePublicUrl("icon_misc", `${id}.${ext}`);
}

export function getCharactersDataUrl() {
	return getStoragePublicUrl("characters", "data.json");
}
