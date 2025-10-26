import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface AddButtonProps {
    to: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function AddButton({
    to,
    onClick
}: AddButtonProps) {

    return (
        <Link to={to} onClick={onClick}>
            <Button
                variant="ghost"
                className="w-full gap-2"
            >
                <Plus className="size-4" />
                <span className="text-base font-semibold">추가</span>
            </Button>
        </Link>
    )
}
