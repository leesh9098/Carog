import FlexDiv from "@/components/FlexDiv";
import {Button} from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        const KAKAO_CLIENT_ID = "6c6081ab06b056a8a621ebd33bfcee55";
        const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    };

    useEffect(() => {
        const cookie = document.cookie;
        if (cookie) {
            const token = cookie.split('; ').find(row => row.startsWith('token='));
            if (token) {
                navigate('/');
            }
        }
    }, []);

    return (
        <FlexDiv className="w-full h-[calc(100dvh-56px)] justify-center items-center">
            <Button
                className="bg-[#FEE500] text-black hover:bg-[#FEE500] font-semibold"
                onClick={handleLogin}
            >
                카카오로 로그인
            </Button>
        </FlexDiv>
    )
}
