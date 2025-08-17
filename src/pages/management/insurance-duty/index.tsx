import FlexDiv from "@/components/FlexDiv";
import AddButton from "@/molecules/AddButton";
import ItemCard from "@/components/ItemCard";
import { Textarea } from "@/components/ui/textarea";
import SelectCar from "@/components/SelectCar";
import { useInsuranceDutyList } from "@/hooks/tanstackQuery/useInsuranceDutyList";

export default function InsuranceDuty() {
    // 보험료/세금 페이지

    const { insuranceDutyList, isLoading } = useInsuranceDutyList();

    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <FlexDiv className="justify-center">
                <AddButton to="/management/insurance-duty/add" />
            </FlexDiv>
            {insuranceDutyList?.map(insuranceDuty => (
                <ItemCard
                    key={insuranceDuty.id}
                    date={insuranceDuty.date}
                    to={`/management/insurance-duty/${insuranceDuty.id}`}
                >
                    <FlexDiv className="flex-col gap-2">
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">종류</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {insuranceDuty.type}
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">금액</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {insuranceDuty.price.toLocaleString()}원
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">보험사</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {insuranceDuty.company}
                            </p>
                        </FlexDiv>
                        {insuranceDuty.memo && (
                            <FlexDiv className="flex-col gap-2">
                                <p className="text-sm font-semibold">메모</p>
                                <Textarea value={insuranceDuty.memo} disabled />
                            </FlexDiv>
                        )}
                    </FlexDiv>
                </ItemCard>
            ))}
        </FlexDiv>
    )
}
