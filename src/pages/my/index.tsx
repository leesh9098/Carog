import CarCard from "@/components/CarCard";
import FlexDiv from "@/components/FlexDiv";
import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/SessionContext";
import { useCarList } from "@/hooks/tanstackQuery/useCarList";
import { ax, getCookie } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

export default function My() {
    const navigate = useNavigate();

    const { cars } = useCarList();

    const {
        user,
        setIsLoggedIn,
        setUser
    } = useSession();

    const handleLogout = async () => {
        const token = getCookie('token');

        try {
            await ax.post('/auth/logout/kakao', null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            document.cookie = `token=; path=/; max-age=0;`;
            setIsLoggedIn(false);
            setUser(null);
            navigate('/');
        } catch (error: any) {
            console.error(error);
            if (error.response.data.code === "EA0006") {
                navigate("/");
            }
        }
    };
    
    return (
        <div>
            <FlexDiv className="p-4 flex-col border-b border-gray-300">
                <p className="font-semibold text-gray-400 mb-2">계정 정보</p>
                <p className="font-semibold">
                    {user?.nickname}
                </p>
                <p className="font-semibold text-gray-500 mb-2">
                    {user?.email}
                </p>
                <Button
                    className="self-end font-semibold"
                    onClick={handleLogout}
                >
                    로그아웃
                </Button>
            </FlexDiv>
            <div className="p-4">
                <FlexDiv className="w-full justify-between items-center mb-4">
                    <span className="font-semibold text-gray-400">차량 목록</span>
                    <Link
                        to="/my/cars"
                        className="font-semibold text-gray-400"
                    >
                        관리
                    </Link>
                </FlexDiv>
                <FlexDiv className="flex-col gap-y-4">
                    {cars?.map((car) => (
                        <CarCard
                            key={car.id}
                            {...car}
                        />
                    ))}
                </FlexDiv>
            </div>
        </div>
    )
}
