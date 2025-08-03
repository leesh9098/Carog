import FlexDiv from "@/components/FlexDiv";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCarList } from "@/hooks/tanstackQuery/useCarList";
import { Outlet } from "react-router-dom";

export default function ManagementLayout() {
    const { cars, isLoading } = useCarList();

    return (
        <FlexDiv className="flex-col gap-4 p-4">
            {isLoading ? (
                <Skeleton className="w-full h-9 rounded-full" />
            ) : (
                <Select defaultValue={cars?.find((car) => car.represent)?.id.toString() ?? cars?.[0]?.id.toString()}>
                    <SelectTrigger className="w-full rounded-full border-black font-semibold">
                        <SelectValue placeholder="차량을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                        {cars?.map((car) => (
                            <SelectItem key={car.id} value={car.id.toString()}>
                                {car.name} | {car.number}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
            <Outlet />
        </FlexDiv>
    )
}
