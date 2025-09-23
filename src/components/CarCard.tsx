import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import LicensePlate from "@/components/LicensePlate";
import FlexDiv from "@/components/FlexDiv";
import { Button } from "@/components/ui/button";
import { ax, ExpiredTokenErrorCode, getCookie } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function CarCard({
    isDetailPage = false,
    id,
    name,
    number,
    represent
}: {
    isDetailPage?: boolean;
    id: number;
    name: string;
    number: string;
    represent: boolean;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const handleRepresentDialog = async () => {
        setIsOpen(true);
    };

    const handleRepresent = async () => {
        try {
            const token = getCookie('token');
            await ax.put(`/car/represent/${id}`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ['carList'] });
        } catch (error: any) {
            console.error(error);
            if (ExpiredTokenErrorCode.includes(error.response.data.code)) {
                alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                navigate("/login");
            }
        }
    };

    const handleDeleteDialog = async () => {
        setDeleteIsOpen(true);
    };

    const handleDeleteCar = async () => {
        try {
            const token = getCookie('token');
            await ax.delete(`/car/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            queryClient.invalidateQueries({ queryKey: ['carList'] });
            window.sessionStorage.removeItem('selectedCar');
            setDeleteIsOpen(false);
        } catch (error: any) {
            console.error(error);
            if (ExpiredTokenErrorCode.includes(error.response.data.code)) {
                alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                navigate("/login");
            }
        }
    };

    return (
        <>
            <Card className="w-full py-4 gap-y-2">
                <CardHeader className="items-center px-4 gap-0">
                    <CardTitle>
                        {represent ? (
                            <Badge className="text-xs font-semibold px-[6px]">대표</Badge>
                        ) : (
                            <Button 
                                variant="ghost"
                                className="text-sm text-gray-400 font-semibold p-0 h-fit hover:bg-transparent"
                                onClick={handleRepresentDialog}
                            >
                                대표 차량으로 설정
                            </Button>
                        )}
                    </CardTitle>
                    {isDetailPage && (
                        <CardAction className="h-full">
                            <FlexDiv className="h-full items-center text-sm text-gray-400 font-semibold gap-x-1">
                                <Link to={`/my/cars/${id}`}>
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
                    )}
                </CardHeader>
                <CardContent className="px-4">
                    <p className="text-xl font-bold mb-2">
                        {name}
                    </p>
                    <LicensePlate
                        licensePlateNumber={number}
                        className="mx-auto"
                    />
                </CardContent>
            </Card>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>대표 차량 설정</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        대표 차량으로 설정하시겠습니까?
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            취소
                        </Button>
                        <Button
                            variant="default"
                            onClick={handleRepresent}
                        >
                            확인
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
                            onClick={handleDeleteCar}
                        >
                            확인
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
