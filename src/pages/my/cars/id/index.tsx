import FlexDiv from "@/components/FlexDiv";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCarList } from "@/hooks/tanstackQuery/useCarList";
import { ax, getCookie } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Car() {
    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [isRepresent, setIsRepresent] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const { cars } = useCarList();

    const car = cars?.find((car) => car.id.toString() === id);

    const handleRepresent = (checked: boolean) => {
        setIsRepresent(checked);
    };

    const handleSave = async () => {
        try {
            const token = getCookie("token");
            if (isRepresent) {
                await ax.put(`/car/represent/${id}`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                if (cars?.length === 1) {
                    setIsOpen(true);
                    return;
                }
                await ax.put(`/car/unrepresent/${id}`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
            await ax.put("car", {
                id,
                name,
                number
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            navigate("/my/cars", { replace: true });
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (!car) return;
        setName(car.name);
        setNumber(car.number);
        setIsRepresent(car.represent);
    }, [car]);

    return (
        <>
            <FlexDiv className="flex-col gap-4 p-4">
                <FlexDiv className="items-center gap-2">
                    <Checkbox
                        id="represent"
                        checked={isRepresent}
                        onCheckedChange={handleRepresent}
                        className="size-[22px]"
                    />
                    {isRepresent ? (
                        <Label htmlFor="represent">
                            <Badge className="text-xs font-semibold px-[6px]">대표</Badge>
                        </Label>
                    ) : (
                        <Label
                            htmlFor="represent"
                            className="text-sm text-gray-400 font-semibold p-0 h-fit"
                        >
                            대표 차량으로 설정
                        </Label>
                    )}
                </FlexDiv>
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
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>대표 차량 설정 오류</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        대표 차량 해제는 등록된 차량이 최소 2대 이상이어야 합니다
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            variant="default"
                            onClick={() => setIsOpen(false)}
                        >
                            확인
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
