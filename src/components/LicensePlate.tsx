import { cn } from "@/lib/utils";
import FlexDiv from "@/components/FlexDiv";

export default function LicensePlate({
    licensePlateNumber,
    className
}: {
    licensePlateNumber: string;
    className?: string;
}) {
    // const getLicensePlateNumber = async () => {

    // };
    
    return (
        <FlexDiv className={cn("w-[294px] justify-center border-3 border-black rounded-2xl p-2 font-semibold text-[32px]", className)}>
            {licensePlateNumber}
        </FlexDiv>
    )
}
