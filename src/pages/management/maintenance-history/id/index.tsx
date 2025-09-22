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
import { useMaintenanceHistoryList } from "@/hooks/tanstackQuery/useMaintenanceHistoryList";

export default function MaintenanceHistoryId() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");
    const [mileage, setMileage] = useState("");
    const [company, setCompany] = useState("");
    const [memo, setMemo] = useState("");
    const navigate = useNavigate();
    const { selectedCar } = useSelectedCar();
    const { id } = useParams();
    const { maintenanceHistoryList } = useMaintenanceHistoryList(selectedCar?.id);

    useEffect(() => {
        if (maintenanceHistoryList.length > 0) {
            const maintenanceHistory = maintenanceHistoryList.find(maintenanceHistory => maintenanceHistory.id === Number(id));
            if (!maintenanceHistory) return;
            setDate(maintenanceHistory.date ? new Date(maintenanceHistory.date) : undefined);
            setItem(maintenanceHistory.item);
            setPrice(maintenanceHistory.price.toString());
            setMileage(maintenanceHistory.mileage.toString());
            setCompany(maintenanceHistory.company);
            setMemo(maintenanceHistory.memo ?? "");
        }
    }, [maintenanceHistoryList]);

    async function handleUpdate() {
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
            navigate("/management/maintenance-history", { replace: true });
        } catch (error: any) {
            console.error(error);
            if (error.response.data.code === "EA0006") {
                alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                navigate("/login");
            }
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
                    htmlFor="item"
                    className="text-sm font-semibold"
                >
                    항목
                </Label>
                <Input
                    id="item"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="항목을 입력해주세요"
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
                    placeholder="0원"
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
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="0"
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
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="업체명을 입력해주세요"
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