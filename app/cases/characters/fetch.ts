import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { getConvexHttp } from "~/lib/convex-http";
import { CharacterDataNotFound } from "./errors";

// It is kinda awkward, shouldn't use convex in the first place?
export const getCharacters = createServerFn({
	method: "GET",
}).handler(async () => {
	const characters = await getConvexHttp().query(api.characters.get);

	return characters.map((char) => ({
		...char,
		_id: char._id.toString(),
	}));
});

export type BaseCharacter = Awaited<ReturnType<typeof getCharacters>>[0];

export const getCharacter = createServerFn({
	method: "GET",
})
	.validator((data: string) => data)
	.handler(async (ctx) => {
		const character = await getConvexHttp().query(api.character.get, {
			name: ctx.data,
		});
		if (!character) throw notFound();

		return {
			...character,
			_id: character._id.toString(),
		};
	});

export const getCostumes = createServerFn({
	method: "GET",
})
	.validator((data: string) => data)
	.handler(async (ctx) => {
		const costumes = await getConvexHttp().query(api.costumes.get, {
			character_id: ctx.data as Id<"characters">,
		});

		return costumes.map((co) => ({
			...co,
			_id: co._id.toString(),
			character_id: co.character_id.toString(),
		}));
	});

export const getExclusiveGear = createServerFn({
	method: "GET",
})
	.validator((data: string) => data)
	.handler(async (ctx) => {
		const exclusiveGear = await getConvexHttp().query(api.exclusive_gear.get, {
			character_id: ctx.data as Id<"characters">,
		});

		if (!exclusiveGear) {
			throw new CharacterDataNotFound(
				`Fail to get exclusive gear associated with ${ctx.data}`,
				ctx.data,
			);
		}

		return {
			...exclusiveGear,
			_id: exclusiveGear._id.toString(),
			character_id: exclusiveGear.character_id.toString(),
		};
	});

export const getTalent = createServerFn({
	method: "GET",
})
	.validator((data: string) => data)
	.handler(async (ctx) => {
		const talent = await getConvexHttp().query(api.talent.get, {
			character_id: ctx.data as Id<"characters">,
		});

		if (!talent) {
			throw new CharacterDataNotFound(
				`Fail to get talent associated with ${ctx.data}`,
				ctx.data,
			);
		}

		return {
			...talent,
			_id: talent._id.toString(),
			character_id: talent.character_id.toString(),
		};
	});
