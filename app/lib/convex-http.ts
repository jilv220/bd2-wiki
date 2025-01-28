import { ConvexHttpClient } from "convex/browser";

// Don't access env in global for cloudflare...
export const getConvexHttp = () => {
	return new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL!);
};
