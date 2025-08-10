import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import LicensePlate from "@/components/LicensePlate";
import FlexDiv from "@/components/FlexDiv";

export default function CarCard({
    isDetailPage = false,
    id,
    name,
    number,
    represent
}: {
    isDetailPage?: boolean;
    id: number;
    name: string;
    number: string;
    represent: boolean;
}) {
    const handleSetRepresentative = async () => {

    };

    const handleDeleteCar = async () => {

    };

    return (
        <Card className="w-full py-4 gap-y-2">
            <CardHeader className="items-center px-4 gap-0">
                <CardTitle>
                    {represent ? (
                        <Badge className="text-xs font-semibold px-[6px]">대표</Badge>
                    ) : (
                        <p
                            className="text-sm text-gray-400 font-semibold cursor-pointer"
                            onClick={handleSetRepresentative}
                        >
                            대표 차량으로 설정
                        </p>
                    )}
                </CardTitle>
                {isDetailPage && (
                    <CardAction className="h-full">
                        <FlexDiv className="h-full items-center text-sm text-gray-400 font-semibold gap-x-1">
                            <Link to={`/my/cars/${id}`}>
                                수정
                            </Link>
                            ·
                            <span
                                className="cursor-pointer"
                                onClick={handleDeleteCar}
                            >
                                삭제
                            </span>
                        </FlexDiv>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent className="px-4">
                <p className="text-xl font-bold mb-2">
                    {name}
                </p>
                <LicensePlate
                    licensePlateNumber={number}
                    className="mx-auto"
                />
            </CardContent>
        </Card>
    )
}
