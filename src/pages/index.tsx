import FlexDiv from "@/components/FlexDiv";
import { Link } from "react-router-dom";

const buttons: {
    id: number;
    name: string;
    path: string;
    // imgUrl: string;
}[] = [
    {
        id: 1,
        name: '정비내역',
        path: '/management/maintenance-history',
        // imgUrl: '',
    },
    {
        id: 2,
        name: '유류비',
        path: '/management/fuel',
        // imgUrl: '',
    },
    {
        id: 3,
        name: '보험료/세금',
        path: '/management/insurance-duty',
        // imgUrl: '',
    },
    {
        id: 4,
        name: '사고',
        path: '/management/accident',
        // imgUrl: '',
    },
    {
        id: 5,
        name: '할부',
        path: '/management/installment',
        // imgUrl: '',
    },
    {
        id: 6,
        name: '주차비',
        path: '/management/parking-fee',
        // imgUrl: '',
    },
    {
        id: 7,
        name: '기타',
        path: '/management/etc',
        // imgUrl: '',
    }
];

export default function Home() {
    const buttonList = buttons.map((button) => (
        <FlexDiv
            key={button.id}
            className="flex flex-col items-center gap-2"
        >
            <div className="size-12 bg-gray-200 rounded-full">
                {/* <img src={button.imgUrl} alt={button.name} /> */}
            </div>
            <span
                className="mt-2 text-center text-sm font-medium"
            >
                <Link to={button.path}>
                    {button.name}
                </Link>
            </span>
        </FlexDiv>
    ))

    return (
        <FlexDiv className="flex flex-wrap gap-16 p-4 ">
            {buttonList}
        </FlexDiv>
    );
}
