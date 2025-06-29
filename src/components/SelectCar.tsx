import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SelectCar() {
    return (
        <Select defaultValue="0">
            <SelectTrigger className="w-full">
                <SelectValue placeholder="차량을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="0">LF소나타 | 65보 6191</SelectItem>
                <SelectItem value="1">투싼 | 62주 7767</SelectItem>
                <SelectItem value="2">싼타페 | 12가 3456</SelectItem>
                <SelectItem value="3">레이 | 34나 56783</SelectItem>
            </SelectContent>
        </Select>
    )
}