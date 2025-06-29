import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function FuelId() {
    return (
        <FlexDiv className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">유종</p>
                <Input placeholder="휘발유/경유/LPG" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">금액</p>
                <Input placeholder="0원" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">리터수</p>
                <Input placeholder="0L" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">단가</p>
                <Input placeholder="0원" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">업체명</p>
                <Input placeholder="업체명을 입력해주세요" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">키로수</p>
                <Input placeholder="0km" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">메모</p>
                <Textarea />
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="default">저장</Button>
                <Button variant="outline">취소</Button>
            </div>
        </FlexDiv>
    )
}