import FlexDiv from "@/components/FlexDiv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function MaintenanceHistoryAdd() {
    return (
        <FlexDiv className="flex-col gap-4 p-4">
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="item" className="text-sm font-semibold">항목</Label>
                <Input id="item" placeholder="항목을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="price" className="text-sm font-semibold">금액</Label>
                <Input id="price" placeholder="0원" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="kilometer" className="text-sm font-semibold">키로수</Label>
                <Input id="kilometer" placeholder="0km" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="company" className="text-sm font-semibold">업체명</Label>
                <Input id="company" placeholder="업체명을 입력해주세요" />
            </FlexDiv>
            <FlexDiv className="flex-col gap-2">
                <Label htmlFor="memo" className="text-sm font-semibold">메모</Label>
                <Textarea id="memo" className="bg-white" />
            </FlexDiv>
            <FlexDiv className="justify-end gap-2">
                <Button variant="default">추가</Button>
                <Button variant="outline">취소</Button>
            </FlexDiv>
        </FlexDiv>
    )
}