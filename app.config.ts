// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import { generateSitemap } from "tanstack-router-sitemap";
import { cloudflare } from "unenv";
import tsConfigPaths from "vite-tsconfig-paths";
import { sitemap } from "./app/lib/generate-sitemap";

export default defineConfig({
	vite: {
		plugins: [
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
			generateSitemap(sitemap),
		],
	},
	server: {
		preset: "cloudflare-pages",
		unenv: cloudflare,
		prerender: {
			routes: ["/"],
			// Fix trailing slash issue?
			autoSubfolderIndex: false,
			crawlLinks: true,
		},
	},
});
