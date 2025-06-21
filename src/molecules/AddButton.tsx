import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddButton({ to }: { to: string }) {
    return (
        <Link to={to}>
            <Button
                variant="ghost"
                className="gap-2"
            >
                <Plus className="size-4" />
                <span className="text-base font-semibold">추가</span>
            </Button>
        </Link>
    )
}
