import { ConvexHttpClient } from "convex/browser";

// Don't access env in global for cloudflare...
export const getConvexHttp = (env: string) => {
	return new ConvexHttpClient(env);
};
