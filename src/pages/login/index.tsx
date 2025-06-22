import FlexDiv from "@/components/FlexDiv";
import { Button } from "@/components/ui/button";

export default function Login() {
    const handleLogin = async () => {

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
