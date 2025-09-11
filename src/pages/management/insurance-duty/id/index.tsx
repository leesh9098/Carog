import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useSelectedCar } from "@/contexts/SelectedCarContext";
import { useInsuranceDutyList } from "@/hooks/tanstackQuery/useInsuranceDutyList";
import { ax, getCookie } from "@/lib/utils";

export default function InsuranceDutyId() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [memo, setMemo] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedCar } = useSelectedCar();
    const { insuranceDutyList } = useInsuranceDutyList(selectedCar?.id);
    const token = getCookie('token');

    useEffect(() => {
        if (insuranceDutyList.length > 0) {
            const insuranceDuty = insuranceDutyList.find(insuranceDuty => insuranceDuty.id === Number(id));
            if (!insuranceDuty) return;
            setDate(insuranceDuty.date ? new Date(insuranceDuty.date) : undefined);
            setType(insuranceDuty.type);
            setPrice(insuranceDuty.price.toString());
            setCompany(insuranceDuty.company);
            setMemo(insuranceDuty.memo ?? "");
        }
    }, [insuranceDutyList]);

    const handleGoBack = () => {
        navigate(-1);
    };

    async function handleUpdate() {
        try {
            await ax.put(`/insurance`, {
                id,
                type,
                price,
                company,
                memo,
                date,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate("/management/insurance-duty", { replace: true });
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
                    className="w-4 h-4" onClick={() =>  setIsOpenCalendar(!isOpenCalendar)} 
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
                    placeholder="보험료 / 세금" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)} 
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
                    htmlFor="company" 
                    className="text-sm font-semibold"
                >
                    업체명
                </Label>
                <Input 
                    id="company" 
                    placeholder="업체명을 입력해주세요" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
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