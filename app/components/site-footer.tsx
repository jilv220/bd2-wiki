import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../components/ui/button";

export function SiteFooter() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t px-4 py-2 md:py-0">
			<div className="flex items-center justify-between space-x-2 py-2 text-center text-muted-foreground text-sm leading-relaxed md:space-x-0 md:text-left">
				<div>
					<p>© {year} bd2-wiki by jilv220. All rights reserved.</p>
					<p className="hidden md:block">
						This website is not affiliated with or endorsed by Browndust2. All
						trademarks and copyrights of the game and its characters are owned
						by their respective owners.
					</p>
				</div>
				<a
					className={cn(
						buttonVariants({
							variant: "ghost",
							size: "icon",
						}),
					)}
					href="https://github.com/jilv220/bd2-wiki"
					target="_blank"
					rel="noreferrer"
				>
					<Github />
				</a>
			</div>
		</footer>
	);
}
