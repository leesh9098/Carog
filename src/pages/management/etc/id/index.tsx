import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useEtcListById } from "@/hooks/tanstackQuery/useEtcList";
import { useSelectedCar } from "@/contexts/SelectedCarContext";
import { ax, getCookie } from "@/lib/utils";

export default function EtcId() {
    const navigate = useNavigate();
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [memo, setMemo] = useState("");
    const { id } = useParams();
    const { selectedCar } = useSelectedCar();
    const { etcListById } = useEtcListById(selectedCar?.id);
    const token = getCookie('token');

    useEffect(() => {
        if (etcListById.length > 0) {
            const etc = etcListById.find(etc => etc.id === Number(id));
            if (!etc) return;
            setDate(etc.date ? new Date(etc.date) : undefined);
            setItem(etc.item);
            setPrice(etc.price.toString());
            setMemo(etc.memo ?? "");
        }
    }, [etcListById]);

    const handleGoBack = () => {
        navigate(-1);
    };

    async function handleUpdate() {
        try {
            await ax.put(`/etc`, {
                id,
                item,
                price,
                memo,
                date,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/management/etc", { replace: true });
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
                    htmlFor="item" 
                    className="text-sm font-semibold"
                >
                    항목
                </Label>
                <Input 
                    id="item" 
                    placeholder="항목을 입력해주세요" 
                    value={item} 
                    onChange={(e) => setItem(e.target.value)} 
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
                    placeholder="0" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
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
                    className="bg-white" 
                    value={memo} 
                    onChange={(e) => setMemo(e.target.value)} 
                />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button variant="default" onClick={handleUpdate}>저장</Button>
                <Button variant="outline" onClick={handleGoBack}>취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}