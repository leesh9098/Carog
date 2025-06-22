import FlexDiv from "@/components/FlexDiv";
import ItemCard from "@/components/ItemCard";
import AddButton from "@/molecules/AddButton";

export default function Cars() {
    return (
        <div className="w-full">
            <AddButton to="/" />
            <h1>Cars</h1>
            <ItemCard date="2025-06-21" to="/">
                <FlexDiv className="justify-between items-center">
                    <span className="text-base font-semibold">테스트</span>
                    <span className="text-base font-semibold text-gray-400">테스트</span>
                </FlexDiv>
                <FlexDiv className="justify-between items-center">
                    <span className="text-base font-semibold">테스트1</span>
                    <span className="text-base font-semibold text-gray-400">테스트1</span>
                </FlexDiv>
            </ItemCard>
        </div>
    )
}
