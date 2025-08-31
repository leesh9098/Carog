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
import { useParkingFeeListById } from "@/hooks/tanstackQuery/useParkingFeeList";

export default function ParkingFeeId() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [price, setPrice] = useState("");
    const [memo, setMemo] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedCar } = useSelectedCar();
    const { parkingFeeListById } = useParkingFeeListById(selectedCar?.id);
    const token = getCookie('token');

    useEffect(() => {
        if (parkingFeeListById.length > 0) {
            const parkingFee = parkingFeeListById.find(parkingFee => parkingFee.id === Number(id));
            if (!parkingFee) return;
            setDate(parkingFee.date ? new Date(parkingFee.date) : undefined);
            setPrice(parkingFee.price.toString());
            setMemo(parkingFee.memo ?? "");
        }
    }, [parkingFeeListById]);
    async function handleUpdate() {
        try {
            await ax.put(`/parking`, {
                id,
                price,
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

    const handleGoBack = () => {
        navigate(-1);
    };

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
                    onClick={() => setIsOpenCalendar(!isOpenCalendar)} 
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
                    htmlFor="price" 
                    className="text-sm font-semibold"
                >
                    금액(원)
                </Label>
                <Input 
                    id="price" 
                    placeholder="0원" 
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