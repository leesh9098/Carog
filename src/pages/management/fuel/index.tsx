import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";

export default function Fuel() {
    // 유류비 페이지
    return (
        <FlexDiv className="flex flex-col gap-4 p-4">
        <div className="flex justify-center">
            <AddButton to="/management/fuel/add" />
        </div>
        <ItemCard
            date="2025-06-21"
            to="/management/fuel/1"
        >
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">유종</p>
                    <p className="text-sm font-semibold text-gray-400">휘발유</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">금액</p>
                    <p className="text-sm font-semibold text-gray-400">100,000원</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">리터수</p>
                    <p className="text-sm font-semibold text-gray-400">40L</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">업체명</p>
                    <p className="text-sm font-semibold text-gray-400">현대셀프주유소</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">키로수</p>
                    <p className="text-sm font-semibold text-gray-400">123,456km</p>
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
