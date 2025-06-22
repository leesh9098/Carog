import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";

export default function Installment() {
    // 할부 페이지
    return (
        <FlexDiv className="flex flex-col gap-4 p-4">
            <div className="flex justify-center">
                <AddButton to="/management/installment/add" />
            </div>
            <ItemCard
                date="2025-06-21"
                to="/management/installment/1"
            >
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">금액</p>
                        <p className="text-sm font-semibold text-gray-400">300,000원</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">납부/전체</p>
                        <p className="text-sm font-semibold text-gray-400">1 / 60</p>
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
