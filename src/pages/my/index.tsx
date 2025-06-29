import CarCard from "@/components/CarCard";
import FlexDiv from "@/components/FlexDiv";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const mockCarList = [
    {
        id: 1,
        name: "LF소나타",
        licensePlateNumber: "65보 6191",
        isRepresentative: true
    },
    {
        id: 2,
        name: "모닝",
        licensePlateNumber: "65보 6192",
        isRepresentative: false
    }
];

export default function My() {
    const handleLogout = async () => {

    };
    
    return (
        <div>
            <FlexDiv className="p-4 flex-col border-b border-gray-300">
                <p className="font-semibold text-gray-400 mb-2">계정 정보</p>
                <p className="font-semibold">이름</p>
                <p className="font-semibold text-gray-500 mb-2">이메일</p>
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
                        목록보기
                    </Link>
                </FlexDiv>
                <FlexDiv className="flex-col gap-y-4">
                    {mockCarList.map((car) => (
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
