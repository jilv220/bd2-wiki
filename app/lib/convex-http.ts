import { ConvexHttpClient } from "convex/browser";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export const convexHttp = new ConvexHttpClient(process.env.VITE_CONVEX_URL!);
