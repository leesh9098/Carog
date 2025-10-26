import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import { useAccidentList } from "@/hooks/tanstackQuery/useAccidentList";
import { useSelectedCar } from "@/contexts/SelectedCarContext";
import { useExistCar } from "@/hooks/useExistCar";

export default function Accident() {
    const { selectedCar } = useSelectedCar();
    const { accidentList } = useAccidentList(selectedCar?.id);
    const { handleCheckExistCar } = useExistCar("/management/accident/add");

    return (
        <>
            <FlexDiv className="justify-center">
                <AddButton to="/management/accident/add" onClick={handleCheckExistCar} />
            </FlexDiv>
            {accidentList?.map(accident => (
                <ItemCard
                    key={accident.id}
                    date={accident.date}
                    to={`/management/accident/${accident.id}`}
                >
                    <FlexDiv className="flex-col gap-2">
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">종류</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {accident.type}
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">금액</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {accident.price.toLocaleString()}원
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">보험사</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {accident.company}
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">기타금액</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {accident.additionalPrice.toLocaleString()}원
                            </p>
                        </FlexDiv>
                        {accident.memo && (
                            <FlexDiv className="flex-col gap-2">
                                <p className="text-sm font-semibold">메모</p>
                                <Textarea value={accident.memo} disabled />
                            </FlexDiv>
                        )}
                    </FlexDiv>
                </ItemCard>
            ))}
        </>
    )
}
