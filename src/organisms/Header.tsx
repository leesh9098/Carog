import FlexDiv from "@/components/FlexDiv";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const pathname = location.pathname;

    const { toggleSidebar } = useSidebar();

    function getTitle() {
        if (pathname === '/') {
            return ''
        } else if (pathname === "/login") {
            return '로그인'
        } else if (pathname === "/my") {
            return '마이페이지'
        } else if (pathname === "/my/cars") {
            return '차량목록'
        } else if (pathname === "/management/maintenance-history") {
            return '정비내역'
        } else if (pathname === "/management/fuel") {
            return '유류비'
        } else if (pathname === "/management/insurance-duty") {
            return '보험료/세금'
        } else if (pathname === "/management/accident") {
            return '사고'
        } else if (pathname === "/management/installment") {
            return '할부'
        } else if (pathname === "/management/parking-fee") {
            return '주차비'
        } else if (pathname === "/management/etc") {
            return '기타'
        }
    };

    if (pathname === '/auth/login/kakao') {
        return null;
    }

    return (
        <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-120 h-14 flex items-center shadow-md px-4 bg-white">
            <FlexDiv className="relative w-full justify-between">
                <Link to="/">
                    <span className="text-lg font-bold">Carog</span>
                </Link>
                <span className="text-xl font-bold absolute left-1/2 transform -translate-x-1/2">
                    {getTitle()}
                </span>
                <Button
                    variant="ghost"
                    className="size-fit !p-0 hover:bg-transparent"
                    onClick={toggleSidebar}
                >
                    <Menu className="size-6" />
                </Button>
            </FlexDiv>
        </header>
    )
}
