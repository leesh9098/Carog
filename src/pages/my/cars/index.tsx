import CarCard from "@/components/CarCard";
import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";

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

export default function Cars() {
    return (
        <FlexDiv className="w-full flex-col p-4 gap-y-4">
            <AddButton to="/" />
            <FlexDiv className="flex-col gap-y-4">
                {mockCarList.map((car) => (
                    <CarCard
                        key={car.id}
                        isDetailPage
                        {...car}
                    />
                ))}
            </FlexDiv>
        </FlexDiv>
    )
}
