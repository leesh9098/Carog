import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import SelectCar from "@/components/SelectCar";

export default function Installment() {
    // 할부 페이지
    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <FlexDiv className="justify-center w-full">
                <SelectCar />
            </FlexDiv>
            <FlexDiv className="justify-center">
                <AddButton to="/management/installment/add" />
            </FlexDiv>
            <ItemCard
                date="2025-06-21"
                to="/management/installment/1"
            >
                <FlexDiv className="flex-col gap-2">
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">금액</p>
                        <p className="text-sm font-semibold text-gray-400">300,000원</p>
                    </FlexDiv>
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">납부/전체</p>
                        <p className="text-sm font-semibold text-gray-400">1 / 60</p>
                    </FlexDiv>
                    <FlexDiv className="flex-col gap-2">
                        <p className="text-sm font-semibold">메모</p>
                        <Textarea />
                    </FlexDiv>
                </FlexDiv>
            </ItemCard>
        </FlexDiv>
    )
}
