import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import { useEtcList } from "@/hooks/tanstackQuery/useEtcList";

export default function Etc() {
    // 기타 페이지
    const { etcList } = useEtcList();
    
    return (
        <>
            <FlexDiv className="justify-center">
                <AddButton to="/management/etc/add" />
            </FlexDiv>
            {etcList?.map(etc => (
                <ItemCard
                    key={etc.id}
                    date={etc.date}
                    to={`/management/etc/${etc.id}`}
                >
                    <FlexDiv className="flex-col gap-2">
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">항목</p>
                            <p className="text-sm font-semibold text-gray-400">{etc.item}</p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">금액</p>
                            <p className="text-sm font-semibold text-gray-400">{etc.price.toLocaleString()}원</p>
                        </FlexDiv>
                        {etc.memo && (
                            <FlexDiv className="flex-col gap-2">
                                <p className="text-sm font-semibold">메모</p>
                                <Textarea value={etc.memo} disabled />
                            </FlexDiv>
                        )}
                    </FlexDiv>
                </ItemCard>
            ))}
        </>
    )
}
