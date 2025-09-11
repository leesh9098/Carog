import FlexDiv from "@/components/FlexDiv";
import ItemCard from "@/components/ItemCard";
import AddButton from "@/molecules/AddButton";
import { Textarea } from "@/components/ui/textarea";
import { useMaintenanceHistoryList } from "@/hooks/tanstackQuery/useMaintenanceHistoryList";
import { useSelectedCar } from "@/contexts/SelectedCarContext";

export default function MaintenanceHistory() {
    const { selectedCar } = useSelectedCar();
    const { maintenanceHistoryList } = useMaintenanceHistoryList(selectedCar?.id);

    return (
        <>
            <FlexDiv className="justify-center">
                <AddButton to="/management/maintenance-history/add" />
            </FlexDiv>
            {maintenanceHistoryList?.map(maintenanceHistory => (
                <ItemCard
                    key={maintenanceHistory.id}
                    date={maintenanceHistory.date}
                    to={`/management/maintenance-history/${maintenanceHistory.id}`}
                >
                    <FlexDiv className="flex-col gap-2">
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">항목</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {maintenanceHistory.item}
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">금액</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {maintenanceHistory.price.toLocaleString()}원
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">키로수</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {maintenanceHistory.mileage.toLocaleString()}km
                            </p>
                        </FlexDiv>
                        <FlexDiv className="justify-between items-center">
                            <p className="text-sm font-semibold">업체명</p>
                            <p className="text-sm font-semibold text-gray-400">
                                {maintenanceHistory.company}
                            </p>
                        </FlexDiv>
                        {maintenanceHistory.memo && (
                            <FlexDiv className="flex-col gap-2">
                                <p className="text-sm font-semibold">
                                    메모
                                </p>
                                <Textarea value={maintenanceHistory.memo} disabled />
                            </FlexDiv>
                        )}
                    </FlexDiv>
                </ItemCard>
            ))}
        </>
    )
}
