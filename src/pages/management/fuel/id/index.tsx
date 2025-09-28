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
import { useFuelList } from "@/hooks/tanstackQuery/useFuelList";
import { ax, ExpiredTokenErrorCode, getCookie } from "@/lib/utils";

export default function FuelId() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [liter, setLiter] = useState("");
    const [unit, setUnit] = useState("");
    const [company, setCompany] = useState("");
    const [range, setRange] = useState("");
    const [memo, setMemo] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedCar } = useSelectedCar();
    const { fuelList } = useFuelList(selectedCar?.id);
    const token = getCookie('token');

    useEffect(() => {
        if (fuelList && fuelList.length > 0) {
            const fuel = fuelList.find(fuel => fuel.id === Number(id));
            if (!fuel) return;
            setDate(fuel.date ? new Date(fuel.date) : undefined);
            setType(fuel.type);
            setPrice(fuel.price.toString());
            setLiter(fuel.liter);
            setUnit(fuel.unit.toString());
            setCompany(fuel.company);
            setRange(fuel.range.toString());
            setMemo(fuel.memo ?? "");
        }
    }, [fuelList]);

    async function handleUpdate() {
        try {
            await ax.put(`/oil`, {
                id,
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
                document.cookie = `token=; path=/; max-age=0;`;
                navigate("/login");
            }
        }
    }
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <FlexDiv className="flex-col gap-2">
            <FlexDiv className="justify-between items-center gap-2">
                {date === undefined ?
                <Label 
                    className="text-sm font-semibold"
                >
                    날짜 선택
                </Label>
                : <Label 
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
                <Label 
                    htmlFor="type"
                    className="text-sm font-semibold"
                >
                    유종
                </Label>
                <Input 
                    id="type" 
                    placeholder="휘발유/경유/LPG"
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
                    htmlFor="liter" 
                    className="text-sm font-semibold"
                >
                    리터수(L)
                </Label>
                <Input 
                    id="liter" 
                    placeholder="0" 
                    value={liter} 
                    onChange={(e) => setLiter(e.target.value)} 
                />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label 
                    htmlFor="unit" 
                    className="text-sm font-semibold"
                >
                    단가(원)
                </Label>
                <Input 
                    id="unit" 
                    placeholder="0" 
                    value={unit} 
                    onChange={(e) => setUnit(e.target.value)} 
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
                    htmlFor="kilometer" 
                    className="text-sm font-semibold"
                >
                    키로수(km)
                </Label>
                <Input 
                    id="kilometer" 
                    placeholder="0" 
                    value={range} 
                    onChange={(e) => setRange(e.target.value)} 
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