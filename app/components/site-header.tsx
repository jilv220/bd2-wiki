import { Link } from "@tanstack/react-router";

type AppHeaderProps = {
	children?: React.ReactNode;
};

export function SiteHeader({ children }: AppHeaderProps) {
	const whiteLogoUrl = "/browndust2-logo-white.png";
	const logoUrl = whiteLogoUrl;

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95">
			<div className="flex h-14 items-center space-x-2 pr-5">
				<div className="flex-grow">
					<nav className="flex items-center space-x-2 font-medium text-base text-foreground/60 md:justify-start">
						{children}
						<Link to="/">
							{
								<img
									className="h-10"
									loading="lazy"
									src={logoUrl}
									alt="browndust2-logo"
								/>
							}
						</Link>
					</nav>
				</div>
				<div className="flex items-center space-x-4">
					{/* <Link
						className={buttonVariants({ variant: "default" })}
						to="/signin"
						disabled
					>
						Log In
					</Link> */}
				</div>
			</div>
		</header>
	);
}
