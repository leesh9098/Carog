import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function InsuranceDutyId() {
    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <FlexDiv className="flex-col gap-2">
                <p className="text-sm font-semibold">종류</p>
                <Input placeholder="보험료 / 세금" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <p className="text-sm font-semibold">금액</p>
                <Input placeholder="0원" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <p className="text-sm font-semibold">업체명</p>
                <Input placeholder="업체명을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <p className="text-sm font-semibold">메모</p>
                <Textarea className="bg-white" />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button variant="default">저장</Button>
                <Button variant="outline">취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}