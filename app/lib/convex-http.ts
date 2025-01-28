import { ConvexHttpClient } from "convex/browser";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const convexHttp = new ConvexHttpClient(process.env.CONVEX_URL!);
