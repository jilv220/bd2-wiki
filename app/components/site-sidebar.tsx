import { Link, useLocation } from "@tanstack/react-router";
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
} from "~/components/ui/sidebar";
import { RefinementConverter } from "./refinement-converter";

const data = {
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
					url: "#",
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

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<RefinementConverter />
			</SidebarHeader>
			<SidebarContent className="gap-0">
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
