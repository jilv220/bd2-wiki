import { ConvexHttpClient } from "convex/browser";

export const convexHttp = new ConvexHttpClient(process.env.VITE_CONVEX_URL!);
