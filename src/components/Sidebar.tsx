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
import { useEffect } from "react";
import { ax, ExpiredTokenErrorCode, getCookie } from "@/lib/utils";
import { useSession } from "@/contexts/SessionContext";

export default function Sidebar() {
    const navigate = useNavigate();
    const pathname = useLocation();
    const isHome = pathname.pathname === '/';

    const {
        isLoggedIn,
        user,
        setIsLoggedIn,
        setUser
    } = useSession();

    const { setOpenMobile } = useSidebar();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
        e.preventDefault();
        setOpenMobile(false);
        navigate(to);
    };

    const handleLogout = async () => {
        try {
            const token = getCookie('token');
            await ax.post('/auth/logout/kakao', null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            document.cookie = `token=; path=/; max-age=0;`;
            setIsLoggedIn(false);
            setUser(null);
            setOpenMobile(false);
            navigate('/');
        } catch (error: any) {
            console.error(error);
            if (ExpiredTokenErrorCode.includes(error.response.data.code)) {
                alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [pathname]);

    if (pathname.pathname === '/auth/login/kakao') {
        return null;
    }

    return (
        <ShadcnSidebar side="right">
            {isLoggedIn ? (
                <>
                    <SidebarHeader className="gap-0 border-b border-gray-300">
                        <p className="font-semibold">
                            {user?.nickname}
                        </p>
                        <p className="font-semibold text-gray-500">
                            {user?.email}
                        </p>
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
                                        onClick={handleLogout}
                                    >
                                        로그아웃
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                </>
            ) : (
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <Link
                                    to="/login"
                                    onClick={(e) => handleLinkClick(e, '/login')}
                                >
                                    <SidebarMenuButton className="font-semibold text-lg">
                                        로그인
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            )}
        </ShadcnSidebar>
    )
}
