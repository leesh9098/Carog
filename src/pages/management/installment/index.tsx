import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import { useInstallmentList } from "@/hooks/tanstackQuery/useInstallmentList";
import { useSelectedCar } from "@/contexts/SelectedCarContext";
import { useExistCar } from "@/hooks/useExistCar";

export default function Installment() {
    const { selectedCar } = useSelectedCar();
    const { installmentList } = useInstallmentList(selectedCar?.id);
    const { handleCheckExistCar } = useExistCar("/management/installment/add");

    return (
        <>
            <FlexDiv className="justify-center">
                <AddButton to="/management/installment/add" onClick={handleCheckExistCar} />
            </FlexDiv>
            {installmentList?.map(installment => (
                <ItemCard
                    key={installment.id}
                    path="installment"
                    id={installment.id}
                    carInfoId={installment.carInfoId}
                    queryKey={['installmentList', installment.carInfoId]}
                    date={installment.date}
                    to={`/management/installment/${installment.id}`}
                >
                    <FlexDiv className="flex-col gap-2">
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">금액</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {installment.price.toLocaleString()}원
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">납부/전체</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {installment.round} / {installment.monthly}
                            </p>
                        </FlexDiv>
                        {installment.memo && (
                            <FlexDiv className="flex-col gap-2">
                                <p className="text-sm font-semibold">메모</p>
                                <Textarea value={installment.memo} disabled />
                            </FlexDiv>
                        )}
                    </FlexDiv>
                </ItemCard>
            ))}
        </>
    )
}
