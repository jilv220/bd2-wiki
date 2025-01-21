import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { invariant, notFound } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export function useSkill(costumeId: Id<"costumes">) {
	const { data: skill } = useSuspenseQuery(
		convexQuery(api.skill.get, { costume_id: costumeId }),
	);
	invariant(skill, `Fail to get skill associated with costume: ${costumeId}`);
	return skill;
}

export type Skill = ReturnType<typeof useSkill>;
export type SkillUpgrades = Skill["upgrade"];
