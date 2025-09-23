import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ax, ExpiredTokenErrorCode, getCookie } from "@/lib/utils";
import { useSelectedCar } from "@/contexts/SelectedCarContext";

export default function FuelAdd() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const { selectedCar } = useSelectedCar();
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [liter, setLiter] = useState("");
    const [unit, setUnit] = useState("");
    const [company, setCompany] = useState("");
    const [range, setRange] = useState("");
    const [memo, setMemo] = useState("");
    const handleGoBack = () => {
        navigate(-1);
    };

    const handleAdd = async () => {
        const token = getCookie(`token`);
        try {
            await ax.post(`/oil`, {
                carInfoId: selectedCar?.id,
                type,
                price,
                liter,
                unit,
                company,
                range,
                memo,
                date,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/management/fuel", { replace: true });
        } catch (error: any) {
            console.error(error);
            if (ExpiredTokenErrorCode.includes(error.response.data.code)) {
                alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                navigate("/login");
            }
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
                <Label htmlFor="type" className="text-sm font-semibold">유종</Label>
                <Input id="type" value={type} onChange={(e) => setType(e.target.value)} placeholder="휘발유/경유/LPG" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="price" className="text-sm font-semibold">금액(원)</Label>
                <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="liter" className="text-sm font-semibold">리터수(L)</Label>
                <Input id="liter" value={liter} onChange={(e) => setLiter(e.target.value)} placeholder="0" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="price" className="text-sm font-semibold">단가(원)</Label>
                <Input id="price" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="0" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="company" className="text-sm font-semibold">업체명</Label>
                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="업체명을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="kilometer" className="text-sm font-semibold">키로수(km)</Label>
                <Input id="kilometer" value={range} onChange={(e) => setRange(e.target.value)} placeholder="0" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="memo" className="text-sm font-semibold">메모</Label>
                <Textarea id="memo" value={memo} onChange={(e) => setMemo(e.target.value)} className="bg-white" />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button variant="default" onClick={handleAdd}>추가</Button>
                <Button variant="outline" onClick={handleGoBack}>취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}