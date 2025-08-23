import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";

export default function Etc() {
    // 기타 페이지
    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <FlexDiv className="justify-center">
                <AddButton to="/management/etc/add" />
            </FlexDiv>
            <ItemCard
                date="2025-06-21"
                to="/management/etc/1"
            >
                <FlexDiv className="flex-col gap-2">
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">항목</p>
                        <p className="text-sm font-semibold text-gray-400">방향제</p>
                    </FlexDiv>
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">금액</p>
                        <p className="text-sm font-semibold text-gray-400">300,000원</p>
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
