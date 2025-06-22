import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuItem
} from "@/components/ui/sidebar";

export default function Sidebar() {
    return (
        <ShadcnSidebar side="right">
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarMenuItem>
                    아아
                </SidebarMenuItem>
            </SidebarContent>
        </ShadcnSidebar>
    )
}
