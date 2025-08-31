import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ax, getCookie } from "@/lib/utils";
import { useSelectedCar } from "@/contexts/SelectedCarContext";
import { useAccidentListById } from "@/hooks/tanstackQuery/useAccidentList";

export default function AccidentId() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [additionalPrice, setAdditionalPrice] = useState("");
    const [memo, setMemo] = useState("");
    const { selectedCar } = useSelectedCar();
    const { id } = useParams();
    const navigate = useNavigate();
    const { accidentListById } = useAccidentListById(selectedCar?.id);
    const token = getCookie('token');

    useEffect(() => {
        if (accidentListById.length > 0) {
            const accident = accidentListById.find(accident => accident.id === Number(id));
            if (!accident) return;
            setDate(accident.date ? new Date(accident.date) : undefined);
            setType(accident.type);
            setPrice(accident.price.toString());
            setCompany(accident.company);
            setAdditionalPrice(accident.additionalPrice.toString());
            setMemo(accident.memo ?? "");
        }
    }, [accidentListById]);
    const handleGoBack = () => {
        navigate(-1);
    };

    async function handleUpdate(){
        try {
            await ax.put(`/accident`, {
                id: selectedCar?.id,
                type,
                price,
                company,
                additionalPrice,
                memo,
                date,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FlexDiv className="flex-col gap-4 p-4">
           <FlexDiv className="justify-between items-center gap-2">
                {date === undefined ?
                    <Label 
                        className="text-sm font-semibold"
                    >
                        날짜 선택
                    </Label>
                    : 
                    <Label 
                        className="text-sm font-semibold"
                    >
                        {date?.toLocaleDateString()}
                    </Label>
                    }
                <ChevronDown 
                    className="w-4 h-4" 
                    onClick={() =>  setIsOpenCalendar(!isOpenCalendar)} 
                />
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
                <Label 
                    htmlFor="type" 
                    className="text-sm font-semibold"
                >
                    종류
                </Label>
                <Input 
                    id="type" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
                    placeholder="종류를 입력해주세요" 
                />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label 
                    htmlFor="price" 
                    className="text-sm font-semibold"
                >
                    금액(원)
                </Label>
                <Input 
                    id="price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    placeholder="0" 
                />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label 
                    htmlFor="insurance" 
                    className="text-sm font-semibold"
                >
                    보험사
                </Label>
                <Input 
                    id="insurance" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
                    placeholder="보험사를 입력해주세요" 
                />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label 
                    htmlFor="etc" 
                    className="text-sm font-semibold"
                >
                    기타금액(원)
                </Label>
                <Input 
                    id="etc" 
                    value={additionalPrice} 
                    onChange={(e) => setAdditionalPrice(e.target.value)} 
                    placeholder="0" 
                />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label 
                    htmlFor="memo" 
                    className="text-sm font-semibold"
                >
                    메모
                </Label>
                <Textarea 
                    id="memo" 
                    value={memo} 
                    onChange={(e) => setMemo(e.target.value)} 
                    className="bg-white" 
                />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button variant="default" onClick={handleUpdate}>저장</Button>
                <Button variant="outline" onClick={handleGoBack}>취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}