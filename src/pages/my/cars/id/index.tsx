import FlexDiv from "@/components/FlexDiv";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCarList } from "@/hooks/tanstackQuery/useCarList";
import { ax, getCookie } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Car() {
    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<string>("");

    const { cars, isLoading } = useCarList();

    const { id } = useParams();

    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            const token = getCookie("token");
            await ax.put("car", {
                id,
                name,
                number
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            navigate("/my/cars");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (!cars || cars.length === 0) return;
        const car = cars.find((car) => car.id.toString() === id);
        if (!car) return;
        setName(car.name);
        setNumber(car.number);
    }, [cars]);

    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <Badge className="text-xs font-semibold px-[6px]">대표</Badge>
            {/* <p className="text-sm text-gray-500">대표 차량으로 설정</p> */}
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="name" className="text-sm font-semibold">차량명</Label>
                <Input
                    id="name"
                    placeholder="차량명을 입력해주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="number" className="text-sm font-semibold">차량번호</Label>
                <Input
                    id="number"
                    placeholder="차량번호를 입력해주세요"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button
                    variant="default"
                    onClick={handleSave}
                >
                    저장
                </Button>
                <Button
                    variant="outline"
                    onClick={handleCancel}
                >
                    취소
                </Button>
            </FlexDiv>
        </FlexDiv>
    )
}
