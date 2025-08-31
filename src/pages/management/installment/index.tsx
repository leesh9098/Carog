import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import { useInstallmentList } from "@/hooks/tanstackQuery/useInstallmentList";

export default function Installment() {
    // 할부 페이지

    const { installmentList } = useInstallmentList();

    return (
        <>
            <FlexDiv className="justify-center">
                <AddButton to="/management/installment/add" />
            </FlexDiv>
            {installmentList?.map(installment => (
                <ItemCard
                    key={installment.id}
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
