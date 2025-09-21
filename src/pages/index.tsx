import FlexDiv from "@/components/FlexDiv";
import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/SessionContext";
import { useCarList } from "@/hooks/tanstackQuery/useCarList";
import { getCookie } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Button {
    id: number;
    name: string;
    path: string;
    image: string;
}

const buttons: Button[] = [
    {
        id: 1,
        name: '정비내역',
        path: '/management/maintenance-history',
        image: '/icons/mechanic.png'
    },
    {
        id: 2,
        name: '유류비',
        path: '/management/fuel',
        image: '/icons/gas-pump.png'
    },
    {
        id: 3,
        name: '보험료/세금',
        path: '/management/insurance-duty',
        image: '/icons/fees.png'
    },
    {
        id: 4,
        name: '사고',
        path: '/management/accident',
        image: '/icons/fender-bender.png'
    },
    {
        id: 5,
        name: '할부',
        path: '/management/installment',
        image: '/icons/credit.png'
    },
    {
        id: 6,        
        name: '주차비',
        path: '/management/parking-fee',
        image: '/icons/parking.png'
    },
    {
        id: 7,
        name: '기타',
        path: '/management/etc',
        image: '/icons/more.png'
    }
];

function ButtonList({
    button
}: {
    button: Button;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return null;
    }

    return (
        <Link
            to={isLoggedIn ? button.path : '/login'}
            key={button.id}
            className="flex w-1/4"
        >
            <FlexDiv className="w-full flex-col items-center gap-y-2">
                <div className="size-10 bg-gray-200 border-1 border-black rounded-full overflow-hidden">
                    <img src={button.image} alt={button.name} />
                </div>
                <span
                    className="text-center text-sm font-medium"
                >
                    {button.name}
                </span>
            </FlexDiv>
        </Link>
    )
}

export default function Home() {
    const { isLoggedIn } = useSession();
    const { cars, isLoading } = useCarList();

    return (
        <div>
            {isLoggedIn && !isLoading && cars?.length === 0 && (
                <div className="p-4">
                    <FlexDiv className="flex-col gap-y-4 p-4 border border-gray-300 rounded-md shadow-md">
                        <div>
                            <h6 className="text-lg font-bold">등록된 차량이 없습니다</h6>
                            <p className="text-sm font-semibold text-gray-400">차량을 등록하여 사용해보세요</p>
                        </div>
                        <Link to="/my/cars/add" className="self-end">
                            <Button className="font-semibold">차량 등록</Button>
                        </Link>
                    </FlexDiv>
                </div>
            )}
            <FlexDiv className="flex-wrap gap-y-4 p-4">
                {buttons.map((button) => (
                    <ButtonList
                        key={button.id}
                        button={button}
                    />
                ))}
            </FlexDiv>
        </div>
    );
}
