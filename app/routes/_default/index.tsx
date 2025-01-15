import { Outlet, createFileRoute } from '@tanstack/react-router'
import { SiteFooter } from '~/components/site-footer'
import { SiteHeader } from '~/components/site-header'
import { SiteSidebar } from '~/components/site-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '~/components/ui/sidebar'

export const Route = createFileRoute('/_default/')({
  component: Home,
})

function Home() {
  return <div>Home</div>
}
