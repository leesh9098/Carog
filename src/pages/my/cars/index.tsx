import CarCard from "@/components/CarCard";
import FlexDiv from "@/components/FlexDiv";
import { useCarList } from "@/hooks/tanstackQuery/useCarList";
import AddButton from "@/molecules/AddButton";

export default function Cars() {
    const { cars, isLoading } = useCarList();

    return (
        <FlexDiv className="w-full flex-col p-4 gap-y-4">
            <AddButton to="/my/cars/add" />
            <FlexDiv className="flex-col gap-y-4">
                {cars?.map((car) => (
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
