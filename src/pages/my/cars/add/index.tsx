import FlexDiv from "@/components/FlexDiv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ax, getCookie } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CarAdd() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            const token = getCookie("token");
            await ax.post("/car", {
                name,
                number
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            navigate("/my/cars", { replace: true });
        } catch (error: any) {
            console.error(error);
            if (error.response.data.code === "EA0006") {
                alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                navigate("/login");
            }
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="carName" className="text-sm font-semibold">차량명</Label>
                <Input
                    id="carName"
                    placeholder="차량명을 입력해주세요"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="licensePlateNumber" className="text-sm font-semibold">차량번호</Label>
                <Input
                    id="licensePlateNumber"
                    placeholder="차량번호를 입력해주세요"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button
                    variant="default"
                    onClick={handleAdd}
                >
                    추가
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
