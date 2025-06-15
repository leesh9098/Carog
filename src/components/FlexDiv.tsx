import { type Children } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function FlexDiv({
    children,
    className,
    ...props
}: {
    children: Children;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex", className)}
            {...props}
        >
            {children}
        </div>
    )
}
