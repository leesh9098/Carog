import FlexDiv from "@/components/FlexDiv";
import {Button} from "@/components/ui/button";
// import { useEffect } from "react";

export default function Login() {
    // useEffect(() => {
        
    // }, []);

    const handleLogin = async () => {
        window.location.href = "https://carog-api.seoeungi.work/oauth2/authorization/kakao";
        // window.location.href = "http://localhost:8030/oauth2/authorization/kakao";
    };

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
