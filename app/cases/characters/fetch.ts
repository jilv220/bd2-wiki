import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import type {
	NonNullCharacterCoreRow,
	NonNullCharacterTalentsRow,
} from "~/database.types";
import { getSupabaseServerClient } from "~/lib/supabase";

/**
 * TODO: Use static
 * Wait for "static" serverFn support to land
 */
export const fetchCharacters = createServerFn({ method: "GET" }).handler(
	async () => {
		const supabase = getSupabaseServerClient();
		const { data: characters } = await supabase.from("characters").select();
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
		return talents;
	});
