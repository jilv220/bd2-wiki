import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export function useSkill(costumeId: Id<"costumes">) {
	const { data: skills } = useSuspenseQuery(
		convexQuery(api.skills.get, { costume_id: costumeId }),
	);
	if (skills.length === 0) {
		console.error(
			`Fail to get the skill associated with costume: ${costumeId}`,
		);
		throw notFound();
	}
	return skills[0];
}

export type Skill = ReturnType<typeof useSkill>;
export type SkillUpgrades = Skill["upgrade"];
