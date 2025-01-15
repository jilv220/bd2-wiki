import { Link, useLocation, useMatchRoute } from "@tanstack/react-router";
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

const data = {
	home: {
		title: "About",
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
			],
		},
		{
			title: "Tools",
			items: [
				{
					title: "Daily Tracker",
					url: "/daily-tracker",
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

	const { setOpenMobile } = useSidebar();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setOpenMobile(false);
	}, [location]);

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
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={item.url === pathname}>
											<Link to={item.url}>{item.title}</Link>
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
