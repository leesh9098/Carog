import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import { useParkingFeeList } from "@/hooks/tanstackQuery/useParkingFeeList";
import { useSelectedCar } from "@/contexts/SelectedCarContext";
import { useExistCar } from "@/hooks/useExistCar";

export default function ParkingFee() {
    const { selectedCar } = useSelectedCar();
    const { parkingFeeList } = useParkingFeeList(selectedCar?.id);
    const { handleCheckExistCar } = useExistCar("/management/parking-fee/add");

    return (
        <>
            <FlexDiv className="justify-center">
                <AddButton to="/management/parking-fee/add" onClick={handleCheckExistCar} />
            </FlexDiv>
            {parkingFeeList?.map(parkingFee => (
                <ItemCard
                    key={parkingFee.id}
                    path="parking"
                    id={parkingFee.id}
                    carInfoId={parkingFee.carInfoId}
                    queryKey={['parkingFeeList', parkingFee.carInfoId]}
                    date={parkingFee.date}
                    to={`/management/parking-fee/${parkingFee.id}`}
                >
                    <FlexDiv className="flex-col gap-2">
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">금액</p>
                            <p className="text-sm font-semibold text-gray-400">{parkingFee.price.toLocaleString()}원</p>
                        </FlexDiv>
                        {parkingFee.memo && (
                            <FlexDiv className="flex-col gap-2">
                                <p className="text-sm font-semibold">메모</p>
                                <Textarea value={parkingFee.memo} disabled />
                            </FlexDiv>
                        )}
                    </FlexDiv>
                </ItemCard>
            ))}
        </>
    )
}