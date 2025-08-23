import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { ax, getCookie } from "@/lib/utils";
import { useSelectedCar } from "@/contexts/SelectedCarContext";

export default function MaintenanceHistoryId() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [mileage, setMileage] = useState("");
    const [company, setCompany] = useState("");
    const [memo, setMemo] = useState("");
    const [requestMaintenance, setRequestMaintenance] = useState<any>("");
    const navigate = useNavigate();
    const { selectedCar } = useSelectedCar();
    const { id } = useParams();

    useEffect(() => {
    async function fetchMaintenance(){
        const token = getCookie(`token`);
        try {
            const response = await ax.get(`/maintenance/list/${selectedCar?.id}`, {
                params: {
                    carInfoId: selectedCar?.id,
                    id,
                    item,
                    price,
                    mileage,
                    company,
                    memo,
                    date,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRequestMaintenance(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
        Promise.all([
            fetchMaintenance(),
        ]);
    }, []);

    async function handleUpdate(){
        const token = getCookie(`token`);
        try {
            await ax.put(`/maintenance`, {
                    id,
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
    }

    const handleGoBack = () => {
        navigate(-1);
    };

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
                    selected={requestMaintenance?.date}
                    onSelect={setDate}
                    className="absolute right-0 z-10 bg-white shadow-md rounded-md"
                    captionLayout="dropdown"
                />
            )}
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="item" className="text-sm font-semibold">항목</Label>
                <Input id="item" value={item} defaultValue={requestMaintenance?.item} onChange={(e) => setItem(e.target.value)} placeholder="항목을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="price" className="text-sm font-semibold">금액(원)</Label>
                <Input id="price" value={price} defaultValue={requestMaintenance?.price} onChange={(e) => setPrice(e.target.value)} placeholder="0원" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="kilometer" className="text-sm font-semibold">키로수(km)</Label>
                <Input id="kilometer" value={mileage} defaultValue={requestMaintenance?.mileage} onChange={(e) => setMileage(e.target.value)} placeholder="0" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="company" className="text-sm font-semibold">업체명</Label>
                <Input id="company" value={company} defaultValue={requestMaintenance?.company} onChange={(e) => setCompany(e.target.value)} placeholder="업체명을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="memo" className="text-sm font-semibold">메모</Label>
                <Textarea id="memo" value={memo} defaultValue={requestMaintenance?.memo} onChange={(e) => setMemo(e.target.value)} className="bg-white" />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button variant="default" onClick={handleUpdate}>저장</Button>
                <Button variant="outline" onClick={handleGoBack}>취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}