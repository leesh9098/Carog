import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { useForm } from "react-hook-form";
import { ax, getCookie } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSelectedCar } from "@/contexts/SelectedCarContext";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// interface Maintenance {
//     carInfoId: number;
//     item: string;
//     price: string;
//     mileage: string;
//     company: string;
//     memo: string;
//     date: Date;
// }

export default function MaintenanceHistoryAdd() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [mileage, setMileage] = useState("");
    const [company, setCompany] = useState("");
    const [memo, setMemo] = useState("");
    const { selectedCar } = useSelectedCar();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    // const formSchema = z.object({
    //     carInfoId: z.number(),
    //     item: z.string().min(1),
    //     price: z.string().min(1),
    //     mileage: z.string().min(1),
    //     company: z.string().min(1),
    //     memo: z.string(),
    //     date: z.date(),
    // });

    // const form = useForm<Maintenance>({
    //     defaultValues: {
    //         carInfoId: selectedCar?.id,
    //         item: "",
    //         price: "",
    //         mileage: "",
    //         company: "",
    //         memo: "",
    //         date: date,
    //     },
    //     resolver: zodResolver(formSchema),
    // });


    async function handleAdd(){
        const token = getCookie(`token`);
        console.log(token);
        try {
            await ax.post(`/maintenance`, {
                carInfoId: selectedCar?.id,
                item,
                price,
                mileage,
                company,
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
       // window.location.reload();
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
                <Input id="item" value={item} onChange={(e) => setItem(e.target.value)} placeholder="항목을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label className="text-sm font-semibold">금액</Label>
                <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0원" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="mileage" className="text-sm font-semibold">키로수</Label>
                <Input id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="0km" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="company" className="text-sm font-semibold">업체명</Label>
                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="업체명을 입력해주세요" />
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