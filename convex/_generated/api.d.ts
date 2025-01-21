/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as character from "../character.js";
import type * as characters from "../characters.js";
import type * as costumes from "../costumes.js";
import type * as exclusive_gear from "../exclusive_gear.js";
import type * as http from "../http.js";
import type * as skill from "../skill.js";
import type * as talent from "../talent.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  character: typeof character;
  characters: typeof characters;
  costumes: typeof costumes;
  exclusive_gear: typeof exclusive_gear;
  http: typeof http;
  skill: typeof skill;
  talent: typeof talent;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
