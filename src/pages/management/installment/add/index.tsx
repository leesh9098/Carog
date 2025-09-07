import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSelectedCar } from "@/contexts/SelectedCarContext";
import { ax, getCookie } from "@/lib/utils";


export default function InstallmentAdd() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [price, setPrice] = useState("");
    const [monthly, setMonthly] = useState("");
    const [round, setRound] = useState("");
    const [memo, setMemo] = useState("");
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const { selectedCar } = useSelectedCar();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAdd = async () => {
        const token = getCookie(`token`);
        try {
            await ax.post(`/installment`, {
                carInfoId: selectedCar?.id,
                price,
                monthly,
                round,
                memo,
                date,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/management/installment", { replace: true });
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
                <Label htmlFor="price" className="text-sm font-semibold">금액(원)</Label>
                <Input id="price" placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="monthly" className="text-sm font-semibold">할부(개월)</Label>
                <Input id="monthly" placeholder="0" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="round" className="text-sm font-semibold">납부 횟수</Label>
                <Input id="round" placeholder="0" value={round} onChange={(e) => setRound(e.target.value)} />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="memo" className="text-sm font-semibold">메모</Label>
                <Textarea id="memo" className="bg-white" value={memo} onChange={(e) => setMemo(e.target.value)} />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button variant="default" onClick={handleAdd}>추가</Button>
                <Button variant="outline" onClick={handleGoBack}>취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}