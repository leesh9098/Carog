import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar
} from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export default function Sidebar() {
    const navigate = useNavigate();
    const pathname = useLocation();
    const isHome = pathname.pathname === '/';

    const { setOpenMobile } = useSidebar();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
        e.preventDefault();
        setOpenMobile(false);
        navigate(to);
    };

    return (
        <ShadcnSidebar side="right">
            <SidebarHeader className="gap-0 border-b border-gray-300">
                <p className="font-semibold">이름</p>
                <p className="font-semibold text-gray-500">이메일</p>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {!isHome && (
                        <>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <Link
                                        to="/"
                                        onClick={(e) => handleLinkClick(e, '/')}
                                    >
                                        <SidebarMenuButton className="font-semibold text-lg">
                                            홈
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            </SidebarMenu>
                            <SidebarMenu>
                                <Collapsible defaultOpen>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton className="flex justify-between items-center w-full font-semibold text-lg">
                                                차량관리
                                                <ChevronDown className="size-4" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem className="font-semibold text-base">
                                                    <Link
                                                        to="/management/maintenance-history"
                                                        onClick={(e) => handleLinkClick(e, '/management/maintenance-history')}
                                                    >
                                                        정비내역
                                                    </Link>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem className="font-semibold text-base">
                                                    <Link
                                                        to="/management/fuel"
                                                        onClick={(e) => handleLinkClick(e, '/management/fuel')}
                                                    >
                                                        유류비
                                                    </Link>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem className="font-semibold text-base">
                                                    <Link
                                                        to="/management/insurance-duty"
                                                        onClick={(e) => handleLinkClick(e, '/management/insurance-duty')}
                                                    >
                                                        보험료/세금
                                                    </Link>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem className="font-semibold text-base">
                                                    <Link
                                                        to="/management/accident"
                                                        onClick={(e) => handleLinkClick(e, '/management/accident')}
                                                    >
                                                        사고
                                                    </Link>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem className="font-semibold text-base">
                                                    <Link
                                                        to="/management/installment"
                                                        onClick={(e) => handleLinkClick(e, '/management/installment')}
                                                    >
                                                        할부
                                                    </Link>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem className="font-semibold text-base">
                                                    <Link
                                                        to="/management/parking-fee"
                                                        onClick={(e) => handleLinkClick(e, '/management/parking-fee')}
                                                    >
                                                        주차비
                                                    </Link>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem className="font-semibold text-base">
                                                    <Link
                                                        to="/management/etc"
                                                        onClick={(e) => handleLinkClick(e, '/management/etc')}
                                                    >
                                                        기타
                                                    </Link>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            </SidebarMenu>
                        </>
                    )}
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link
                                to="/my"
                                onClick={(e) => handleLinkClick(e, '/my')}
                            >
                                <SidebarMenuButton className="font-semibold text-lg">
                                    마이페이지
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                className="font-semibold text-lg"
                                onClick={() => {}}
                            >
                                로그아웃 {/* 로그인 */}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </ShadcnSidebar>
    )
}
