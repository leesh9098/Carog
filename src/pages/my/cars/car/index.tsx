import FlexDiv from "@/components/FlexDiv";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";

export default function Car() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <Badge className="text-xs font-semibold px-[6px]">대표</Badge>
            {/* <p className="text-sm text-gray-500">대표 차량으로 설정</p> */}
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="carName" className="text-sm font-semibold">차량명</Label>
                <Input id="carName" placeholder="차량명을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="licensePlateNumber" className="text-sm font-semibold">차량번호</Label>
                <Input id="licensePlateNumber" placeholder="차량번호를 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button
                    variant="outline"
                    onClick={handleCancel}
                >취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}
