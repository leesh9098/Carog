import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import SelectCar from "@/components/SelectCar";

export default function InsuranceDuty() {
    // 보험료/세금 페이지
    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <FlexDiv className="justify-center w-full">
                <SelectCar />
            </FlexDiv>
            <FlexDiv className="justify-center">
                <AddButton to="/management/insurance-duty/add" />
            </FlexDiv>
            <ItemCard
                date="2025-06-21"
                to="/management/insurance-duty/1"
            >
                <FlexDiv className="flex-col gap-2">
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">종류</p>
                        <p className="text-sm font-semibold text-gray-400">보험료</p>
                    </FlexDiv>
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">금액</p>
                        <p className="text-sm font-semibold text-gray-400">100,000원</p>
                    </FlexDiv>
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">보험사</p>
                        <p className="text-sm font-semibold text-gray-400">DB손해보험</p>
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
