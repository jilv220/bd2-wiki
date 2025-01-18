import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { setHeaders } from "vinxi/http";
import type {
	NonNullCharacterCoreRow,
	NonNullCharacterTalentsRow,
} from "~/database.types";
import { getSupabaseServerClient } from "~/lib/supabase";

const setCharacterCacheHeader = () =>
	setHeaders({
		// Don't cache in the browser
		"cache-control": "public, max-age=0, must-revalidate",
		"cdn-cache-control": "max-age=3600, stale-while-revalidate=3600, durable",
	});

export const fetchCharacters = createServerFn({ method: "GET" }).handler(
	async () => {
		const supabase = getSupabaseServerClient();
		const { data: characters } = await supabase.from("characters").select();

		setCharacterCacheHeader();
		return characters || [];
	},
);

export const fetchCharacterCore = createServerFn({ method: "GET" })
	.validator(
		(d: {
			name: string;
		}) => d,
	)
	.handler(async ({ data }) => {
		const supabase = getSupabaseServerClient();
		const { data: character } = await supabase
			.from("characters_core_view")
			.select()
			.eq("name", data.name)
			.single<NonNullCharacterCoreRow>();

		if (!character) throw notFound();
		setCharacterCacheHeader();

		return character;
	});

export const fetchCharacterTalent = createServerFn({ method: "GET" })
	.validator(
		(d: {
			id: string;
		}) => d,
	)
	.handler(async ({ data }) => {
		const supabase = getSupabaseServerClient();
		const { data: talents } = await supabase
			.from("character_talents_view")
			.select()
			.eq("id", data.id)
			.returns<NonNullCharacterTalentsRow[]>();

		if (!talents) throw notFound();
		setCharacterCacheHeader();

		return talents;
	});
