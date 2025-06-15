import FlexDiv from "@/components/FlexDiv";

const buttons: {
    id: number;
    name: string;
}[] = [
    {
        id: 1,
        name: '정비내역',
    },
    {
        id: 2,
        name: '유류비',
    },
    {
        id: 3,
        name: '보험료/세금',
    },
    {
        id: 4,
        name: '사고',
    },
    {
        id: 5,
        name: '할부',
    },
    {
        id: 6,
        name: '꾸미기',
    },
    {
        id: 7,
        name: '주차비',
    }
];

export default function Home() {
    const buttonList = buttons.map((button) => (
        <FlexDiv
            key={button.id}
            className="flex-col items-center"
        >
            <div className="size-10 bg-gray-200 rounded-full">
                {/* <img src={button.image} alt={button.name} /> */}
            </div>
            <span
                className="mt-2 text-center text-sm font-medium"
            >
                {button.name}
            </span>
        </FlexDiv>
    ))

    return (
        <FlexDiv className="gap-16 p-4">
            {buttonList}
        </FlexDiv>
    );
}