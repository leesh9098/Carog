import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function InstallmentId() {
    return (
        <FlexDiv className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">금액</p>
                <Input placeholder="0원" />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">납부/전체</p>
                <Input placeholder="1 / 60" />
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