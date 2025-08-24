import FlexDiv from "@/components/FlexDiv";
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
        image: '/src/assets/mechanic.png'
    },
    {
        id: 2,
        name: '유류비',
        path: '/management/fuel',
        image: '/src/assets/gas-pump.png'
    },
    {
        id: 3,
        name: '보험료/세금',
        path: '/management/insurance-duty',
        image: '/src/assets/fees.png'
    },
    {
        id: 4,
        name: '사고',
        path: '/management/accident',
        image: '/src/assets/fender-bender.png'
    },
    {
        id: 5,
        name: '할부',
        path: '/management/installment',
        image: '/src/assets/credit.png'
    },
    {
        id: 6,        
        name: '주차비',
        path: '/management/parking-fee',
        image: '/src/assets/parking.png'
    },
    {
        id: 7,
        name: '기타',
        path: '/management/etc',
        image: '/src/assets/more.png'
    }
];

function ButtonList({
    button
}: {
    button: Button;
}) {
    return (
        <Link
            to={button.path}
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
    return (
        <FlexDiv className="flex-wrap gap-y-4 p-4">
            {buttons.map((button) => (
                <ButtonList
                    key={button.id}
                    button={button}
                />
            ))}
        </FlexDiv>
    );
}
