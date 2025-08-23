import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FuelId() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <FlexDiv className="flex-col gap-2">
            <FlexDiv className="justify-between items-center gap-2">
                {date === undefined ?
                <Label className="text-sm font-semibold">날짜 선택</Label>
                : <Label className="text-sm font-semibold">{date?.toLocaleDateString()}</Label>
                }
                <ChevronDown className="w-4 h-4" onClick={() =>  setIsOpenCalendar(!isOpenCalendar)} />
            </FlexDiv>
            <FlexDiv className="relative w-full">
            {isOpenCalendar && (
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="absolute right-0 z-10 bg-white shadow-md rounded-md"
                    captionLayout="dropdown"
                />
            )}
            </FlexDiv>
                <Label htmlFor="type" className="text-sm font-semibold">유종</Label>
                <Input id="type" placeholder="휘발유/경유/LPG" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="price" className="text-sm font-semibold">금액(원)</Label>
                <Input id="price" placeholder="0" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="liter" className="text-sm font-semibold">리터수(L)</Label>
                <Input id="liter" placeholder="0" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="unit" className="text-sm font-semibold">단가(원)</Label>
                <Input id="unit" placeholder="0" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="company" className="text-sm font-semibold">업체명</Label>
                <Input id="company" placeholder="업체명을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="kilometer" className="text-sm font-semibold">키로수(km)</Label>
                <Input id="kilometer" placeholder="0" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="memo" className="text-sm font-semibold">메모</Label>
                <Textarea id="memo" className="bg-white" />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button variant="default"><Link to="/management/fuel">저장</Link></Button>
                <Button variant="outline" onClick={handleGoBack}>취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}