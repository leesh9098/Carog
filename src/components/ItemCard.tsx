import type { Children } from "@/lib/types";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import FlexDiv from "@/components/FlexDiv";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { ax, ExpiredTokenErrorCode, getCookie } from "@/lib/utils";
import { useQueryClient, type QueryKey } from "@tanstack/react-query";

export default function ItemCard({
    path,
    id,
    carInfoId,
    queryKey,
    date,
    to,
    children
}: {
    path: string
    id: number
    carInfoId: number
    queryKey: QueryKey
    date: string
    to: string
    children: Children
}) {
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);
    
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const handleDeleteDialog = async () => {
        setDeleteIsOpen(true);
    };

    const handleDelete = async () => {
        try {
            const token = getCookie('token');
            await ax.delete(`/${path}/${carInfoId}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            queryClient.invalidateQueries({ queryKey });
            setDeleteIsOpen(false);
        } catch (error: any) {
            console.error(error);
            if (ExpiredTokenErrorCode.includes(error.response.data.code)) {
                alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                document.cookie = `token=; path=/; max-age=0;`;
                navigate("/login");
            }
        }
    };

    return (
        <>
            <Card className="w-full">
                <CardHeader className="border-b border-gray-300">
                    <CardTitle className="text-sm font-semibold">{date}</CardTitle>
                    <CardAction>
                        <FlexDiv className="h-full items-center text-sm text-gray-400 font-semibold gap-x-1">
                            <Link to={to}>
                                수정
                            </Link>
                            ·
                            <span
                                className="cursor-pointer"
                                onClick={handleDeleteDialog}
                            >
                                삭제
                            </span>
                        </FlexDiv>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <FlexDiv className="flex-col gap-2">
                        {children}
                    </FlexDiv>
                </CardContent>
            </Card>
            <Dialog open={deleteIsOpen} onOpenChange={setDeleteIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>차량 삭제</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        차량을 삭제하시겠습니까?
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteIsOpen(false)}
                        >
                            취소
                        </Button>
                        <Button
                            variant="default"
                            onClick={handleDelete}
                        >
                            확인
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
