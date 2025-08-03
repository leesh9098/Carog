import FlexDiv from "@/components/FlexDiv";
import ItemCard from "@/components/ItemCard";
import AddButton from "@/molecules/AddButton";
import { Textarea } from "@/components/ui/textarea";

export default function MaintenanceHistory() {
    // 정비내역 페이지
    return (
        <>
            <FlexDiv className="justify-center">
                <AddButton to="/management/maintenance-history/add" />
            </FlexDiv>
            <ItemCard
                date="2025-06-21"
                to="/management/maintenance-history/1"
            >
                <FlexDiv className="flex-col gap-2">
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">항목</p>
                        <p className="text-sm font-semibold text-gray-400">차량 정비</p>
                    </FlexDiv>
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">금액</p>
                        <p className="text-sm font-semibold text-gray-400">100,000원</p>
                    </FlexDiv>
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">키로수</p>
                        <p className="text-sm font-semibold text-gray-400">100km</p>
                    </FlexDiv>
                    <FlexDiv className="justify-between items-center">
                        <p className="text-sm font-semibold">업체명</p>
                        <p className="text-sm font-semibold text-gray-400">공임나라</p>
                    </FlexDiv>
                    <FlexDiv className="flex-col gap-2">
                        <p className="text-sm font-semibold">메모</p>
                        <Textarea />
                    </FlexDiv>
                </FlexDiv>
            </ItemCard>
        </>
    )
}
