import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import { useFuelList } from "@/hooks/tanstackQuery/useFuelList";

export default function Fuel() {
    const { fuelList } = useFuelList();

    return (
        <>
            <FlexDiv className="justify-center">
                <AddButton to="/management/fuel/add" />
            </FlexDiv>
            {fuelList?.map(fuel => (
                <ItemCard
                    key={fuel.id}
                    date={fuel.date}
                    to={`/management/fuel/${fuel.id}`}
                >
                    <FlexDiv className="flex-col gap-2">
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">유종</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {fuel.type}
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">금액</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {fuel.price.toLocaleString()}원
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">리터수</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {fuel.liter}L
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">업체명</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {fuel.company}
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">키로수</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {fuel.range.toLocaleString()}km
                            </p>
                        </FlexDiv>
                        {fuel.memo && (
                            <FlexDiv className="flex-col gap-2">
                                <p className="text-sm font-semibold">메모</p>
                                <Textarea value={fuel.memo} disabled />
                            </FlexDiv>
                        )}
                    </FlexDiv>
                </ItemCard>
            ))}
        </>
    )
}
