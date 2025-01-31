import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	useSidebar,
} from "~/components/ui/sidebar";
import { RefinementConverter } from "./refinement-converter";

const EXTERNAL_LINKS = "External Links";
const OFFICIAL_LINKS = "Official Links";

const data = {
	home: {
		title: "Home",
		url: "/",
	},
	navMain: [
		{
			title: "Wiki",
			items: [
				{
					title: "Characters",
					url: "/characters",
				},
				{
					title: "Collections",
					url: "/collections",
				},
			],
		},
		{
			title: "Tools",
			items: [],
		},
		{
			title: EXTERNAL_LINKS,
			items: [
				{
					title: "Reddit",
					url: "https://www.reddit.com/r/BrownDust2Official/",
				},
				{
					title: "DotGG",
					url: "https://dotgg.gg/brown-dust-2/",
				},
				{
					title: "TW Wiki",
					url: "https://browndust2-wiki.pages.dev/",
				},
			],
		},
		{
			title: "Official Links",
			items: [
				{
					title: "BrownDust 2",
					url: "https://www.browndust2.com/en-us/",
				},
				{
					title: "Official Discord",
					url: "https://discord.com/invite/qMbpbvWwja",
				},
				{
					title: "Probability Details",
					url: "https://browndust2.gitbook.io/probabilitydetails_en",
				},
			],
		},
	],
};

export function SiteSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();
	const pathname = location.pathname;

	const isExternal = (str: string) =>
		str === EXTERNAL_LINKS || str === OFFICIAL_LINKS;

	const { setOpenMobile, isMobile } = useSidebar();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setOpenMobile(false);
	}, [location.pathname]);

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<RefinementConverter />
			</SidebarHeader>
			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={data.home.url === pathname}
								>
									<Link to={data.home.url}>{data.home.title}</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* We create a collapsible SidebarGroup for each parent. */}
				{data.navMain.map((nav) => (
					<SidebarGroup key={nav.title}>
						<SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{nav.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											isActive={pathname.includes(item.url)}
										>
											<Link
												to={item.url}
												preload={isMobile ? "viewport" : "intent"}
												target={isExternal(nav.title) ? "_blank" : undefined}
											>
												{item.title}
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
