import type { Children } from "@/lib/types";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import FlexDiv from "./FlexDiv";

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
                    <Link
                        to={to}
                        className="text-sm font-semibold text-gray-500"
                    >
                        수정
                    </Link>
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
