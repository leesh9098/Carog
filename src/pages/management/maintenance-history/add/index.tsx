import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ax } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function MaintenanceHistoryAdd() {
    type Maintenance = {
        item: string;
        price: number;
        kilometer: number;
        company: string;
        memo: string;
    }

    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const form = useForm<Maintenance>({  
        defaultValues: {
            item: "",
            price: 0,
            kilometer: 0,
            company: "",
            memo: "",
        },
    })

    async function handleAdd() {
        try {
            await ax.post("/maintenance", {
                item: form.getValues("item"),
                price: form.getValues("price"),
                kilometer: form.getValues("kilometer"),
                company: form.getValues("company"),
                memo: form.getValues("memo"),
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FlexDiv className="flex-col gap-4 p-4">
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
            <FlexDiv className="flex-col gap-2">
                <Label className="text-sm font-semibold">항목</Label>
                <Input id="item" placeholder="항목을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label className="text-sm font-semibold">금액</Label>
                <Input id="price" placeholder="0원" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="kilometer" className="text-sm font-semibold">키로수</Label>
                <Input id="kilometer" placeholder="0km" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="company" className="text-sm font-semibold">업체명</Label>
                <Input id="company" placeholder="업체명을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="memo" className="text-sm font-semibold">메모</Label>
                <Textarea id="memo" className="bg-white" />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button variant="default"><Link to="/management/maintenance-history">추가</Link></Button>
                <Button variant="outline" onClick={handleGoBack}>취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}