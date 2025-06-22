import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";

export default function Accident() {
    // 사고 페이지
    return (
        <FlexDiv className="flex flex-col gap-4 p-4">
            <div className="flex justify-center">
                <AddButton to="/management/accident/add" />
            </div>
            <ItemCard
                date="2025-06-21"
                to="/management/accident/1"
            >
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">종류</p>
                        <p className="text-sm font-semibold text-gray-400">피해</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">금액</p>
                        <p className="text-sm font-semibold text-gray-400">3,000,000원</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">보험사</p>
                        <p className="text-sm font-semibold text-gray-400">DB손해보험</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">기타금액</p>
                        <p className="text-sm font-semibold text-gray-400">3,000,000원</p>
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
