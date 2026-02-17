import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import { useEtcList } from "@/hooks/tanstackQuery/useEtcList";
import { useSelectedCar } from "@/contexts/SelectedCarContext";
import { useExistCar } from "@/hooks/useExistCar";

export default function Etc() {
    const { selectedCar } = useSelectedCar();
    const { etcList } = useEtcList(selectedCar?.id);
    const { handleCheckExistCar } = useExistCar("/management/etc/add");
    
    return (
        <>
            <FlexDiv className="justify-center">
                <AddButton to="/management/etc/add" onClick={handleCheckExistCar} />
            </FlexDiv>
            {etcList?.map(etc => (
                <ItemCard
                    key={etc.id}
                    path="etc"
                    id={etc.id}
                    carInfoId={etc.carInfoId}
                    queryKey={['etcList', etc.carInfoId]}
                    date={etc.date}
                    to={`/management/etc/${etc.id}`}
                >
                    <FlexDiv className="flex-col gap-2">
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">항목</p>
                            <p className="text-sm font-semibold text-gray-400">{etc.item}</p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">금액</p>
                            <p className="text-sm font-semibold text-gray-400">{etc.price.toLocaleString()}원</p>
                        </FlexDiv>
                        {etc.memo && (
                            <FlexDiv className="flex-col gap-2">
                                <p className="text-sm font-semibold">메모</p>
                                <Textarea value={etc.memo} disabled />
                            </FlexDiv>
                        )}
                    </FlexDiv>
                </ItemCard>
            ))}
        </>
    )
}
