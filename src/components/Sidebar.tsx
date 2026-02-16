import { Link, useLocation, useNavigate } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { ax, cn, ExpiredTokenErrorCode, getCookie } from "@/lib/utils";
import { useSession } from "@/contexts/SessionContext";
import FlexDiv from "./FlexDiv";
import { Button } from "./ui/button";
import { useSidebar } from "@/contexts/SidebarContext";

function SidebarMenuButton({
    className,
    children,
    ...props
}: {
    className?: string;
    children?: React.ReactNode | React.ReactNode[];
} & React.ComponentProps<typeof Button>) {
    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start font-semibold text-lg",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    )
}

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

    const { isOpen, setIsOpen } = useSidebar();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
        e.preventDefault();
        setIsOpen(false);
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
            setIsOpen(false);
            navigate('/');
        } catch (error: any) {
            console.error(error);
            if (ExpiredTokenErrorCode.includes(error.response.data.code)) {
                alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                document.cookie = `token=; path=/; max-age=0;`;
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
        <div className={cn(
            "absolute top-0 right-0 sm:right-[calc((100vw-480px)/2)] w-full max-w-120 h-dvh bg-neutral-900/60 transition-all duration-300 z-10",
            isOpen ? 'opacity-100 visible pointer-events-auto' : "opacity-0 invisible pointer-events-none"
        )}>
            <div className="relative w-full h-full">
                <div
                    className="absolute top-0 left-0 w-[calc(100vw-300px)] sm:w-45 h-full"
                    onClick={() => setIsOpen(false)}
                />
                <div className="absolute top-0 right-0 w-75 h-dvh bg-white">
                    {isLoggedIn ? (
                        <>
                            <FlexDiv className="flex-col p-2 gap-0 border-b border-gray-300">
                                <p className="font-semibold">
                                    {user?.nickname}
                                </p>
                                <p className="font-semibold text-gray-500">
                                    {user?.email}
                                </p>
                            </FlexDiv>
                            <FlexDiv className="min-h-0 flex-1 flex-col gap-2 overflow-auto">
                                <FlexDiv className="relative w-full min-w-0 flex-col p-2">
                                    {!isHome && (
                                        <>
                                            <FlexDiv className="w-full min-w-0 flex-col gap-1">
                                                <Link
                                                    to="/"
                                                    onClick={(e) => handleLinkClick(e, '/')}
                                                >
                                                    <SidebarMenuButton className="font-semibold text-lg">
                                                        홈
                                                    </SidebarMenuButton>
                                                </Link>
                                            </FlexDiv>
                                            <FlexDiv className="w-full min-w-0 flex-col gap-1">
                                                <Collapsible defaultOpen>
                                                    <CollapsibleTrigger asChild>
                                                        <SidebarMenuButton className="flex justify-between items-center w-full font-semibold text-lg">
                                                            차량관리
                                                            <ChevronDown className="size-4" />
                                                        </SidebarMenuButton>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <ul className="border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden">
                                                            <li className="group/menu-sub-item relative font-semibold text-base">
                                                                <Link
                                                                    to="/management/maintenance-history"
                                                                    onClick={(e) => handleLinkClick(e, '/management/maintenance-history')}
                                                                >
                                                                    정비내역
                                                                </Link>
                                                            </li>
                                                            <li className="group/menu-sub-item relative font-semibold text-base">
                                                                <Link
                                                                    to="/management/fuel"
                                                                    onClick={(e) => handleLinkClick(e, '/management/fuel')}
                                                                >
                                                                    유류비
                                                                </Link>
                                                            </li>
                                                            <li className="group/menu-sub-item relative font-semibold text-base">
                                                                <Link
                                                                    to="/management/insurance-duty"
                                                                    onClick={(e) => handleLinkClick(e, '/management/insurance-duty')}
                                                                >
                                                                    보험료/세금
                                                                </Link>
                                                            </li>
                                                            <li className="group/menu-sub-item relative font-semibold text-base">
                                                                <Link
                                                                    to="/management/accident"
                                                                    onClick={(e) => handleLinkClick(e, '/management/accident')}
                                                                >
                                                                    사고
                                                                </Link>
                                                            </li>
                                                            <li className="group/menu-sub-item relative font-semibold text-base">
                                                                <Link
                                                                    to="/management/installment"
                                                                    onClick={(e) => handleLinkClick(e, '/management/installment')}
                                                                >
                                                                    할부
                                                                </Link>
                                                            </li>
                                                            <li className="group/menu-sub-item relative font-semibold text-base">
                                                                <Link
                                                                    to="/management/parking-fee"
                                                                    onClick={(e) => handleLinkClick(e, '/management/parking-fee')}
                                                                >
                                                                    주차비
                                                                </Link>
                                                            </li>
                                                            <li className="group/menu-sub-item relative font-semibold text-base">
                                                                <Link
                                                                    to="/management/etc"
                                                                    onClick={(e) => handleLinkClick(e, '/management/etc')}
                                                                >
                                                                    기타
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            </FlexDiv>
                                        </>
                                    )}
                                    <FlexDiv className="w-full min-w-0 flex-col gap-1">
                                        <Link
                                            to="/my"
                                            onClick={(e) => handleLinkClick(e, '/my')}
                                        >
                                            <SidebarMenuButton className="font-semibold text-lg">
                                                마이페이지
                                            </SidebarMenuButton>
                                        </Link>
                                    </FlexDiv>
                                    <FlexDiv className="w-full min-w-0 flex-col gap-1">
                                        <SidebarMenuButton
                                            className="font-semibold text-lg"
                                            onClick={handleLogout}
                                        >
                                            로그아웃
                                        </SidebarMenuButton>
                                    </FlexDiv>
                                </FlexDiv>
                            </FlexDiv>
                        </>
                    ) : (
                        <FlexDiv className="min-h-0 flex-1 flex-col gap-2 overflow-auto">
                            <FlexDiv className="relative flex w-full min-w-0 flex-col p-2">
                                <FlexDiv className="w-full min-w-0 flex-col gap-1">
                                    <Link
                                        to="/login"
                                        onClick={(e) => handleLinkClick(e, '/login')}
                                    >
                                        <SidebarMenuButton className="font-semibold text-lg">
                                            로그인
                                        </SidebarMenuButton>
                                    </Link>
                                </FlexDiv>
                            </FlexDiv>
                        </FlexDiv>
                    )}
                </div>
            </div>
        </div>
    )
}
