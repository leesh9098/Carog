import type { Children } from "@/lib/types";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import FlexDiv from "@/components/FlexDiv";

export default function ItemCard({
    date,
    to,
    children
}: {
    date: string
    to: string
    children: Children
}) {
    return (
        <Card className="w-full">
            <CardHeader className="border-b border-gray-300">
                <CardTitle className="text-sm font-semibold">{date}</CardTitle>
                <CardAction>
                    <FlexDiv className="h-full items-center text-sm text-gray-400 font-semibold gap-x-1">
                        <Link to={to}>
                            수정
                        </Link>
                        ·
                        <span
                            className="cursor-pointer"
                            // onClick={handleDeleteCar}
                        >
                            삭제
                        </span>
                    </FlexDiv>
                </CardAction>
            </CardHeader>
            <CardContent>
                <FlexDiv className="flex-col gap-2">
                    {children}
                </FlexDiv>
            </CardContent>
        </Card>
    )
}
