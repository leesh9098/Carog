import FlexDiv from "@/components/FlexDiv";
import ItemCard from "@/components/ItemCard";
import AddButton from "@/molecules/AddButton";

export default function MaintenanceHistory() {
    // 정비내역 페이지
    return (
        <FlexDiv className="flex flex-col gap-4 p-4">
            <div className="flex justify-center">
                <AddButton to="/management/maintenance-history/add" />
            </div>
            <ItemCard
                date="2025-06-21"
                to="/management/maintenance-history/1"
            >
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">항목</p>
                        <p className="text-sm font-semibold text-gray-400">차량 정비</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">금액</p>
                        <p className="text-sm font-semibold text-gray-400">100,000원</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">키로수</p>
                        <p className="text-sm font-semibold text-gray-400">100km</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">업체명</p>
                        <p className="text-sm font-semibold text-gray-400">공임나라</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">메모</p>
                        <textarea className="text-sm font-semibold bg-gray-200 rounded-lg"></textarea>
                    </div>
                </div>
            </ItemCard>
        </FlexDiv>
    )
}
