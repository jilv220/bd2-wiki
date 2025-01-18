import { createServerClient } from "@supabase/ssr";
import { parseCookies, setCookie } from "vinxi/http";
import type { Database } from "~/database.types";

export function getSupabaseServerClient() {
	return createServerClient<Database>(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_ANON_KEY!,
		{
			cookies: {
				// @ts-ignore Wait till Supabase overload works
				getAll() {
					return Object.entries(parseCookies()).map(([name, value]) => ({
						name,
						value,
					}));
				},
				setAll(cookies) {
					for (const cookie of cookies) {
						setCookie(cookie.name, cookie.value);
					}
				},
			},
		},
	);
}
