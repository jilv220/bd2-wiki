import { createServerFn } from "@tanstack/start";
import { getCharactersDataUrl } from "~/lib/utils";

import type { CharacterData } from "./types";

export const fetchCharacters = createServerFn({ method: "GET" }).handler(
	async () => {
		const resp = await fetch(getCharactersDataUrl());
		const data = await resp.json();
		return data as CharacterData;
	},
);
