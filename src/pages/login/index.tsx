import FlexDiv from "@/components/FlexDiv";
import {Button} from "@/components/ui/button";

export default function Login() {

    const handleLogin = async () => {
        // TODO leesh9098 env로 안뺴도됨. 문서 확인해보니까 노출되어도 무관힌 값
        const KAKAO_CLIENT_ID = "6c6081ab06b056a8a621ebd33bfcee55";
        // TODO leesh9098 http://localhost:8030 이부분은 실행환경별 동적 변경이 가능하게 되어야 할것으로 보임
        const REDIRECT_URI = "http://localhost:8030/user/login/kakao";
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    };

    // 카카오 콜백 처리
    // TODO leesh9098 로그인 링크 진입 후 이동되는 url에서 code값을 아래 콜백 함수에 파라미터로 넘겨주는 작업 부탁해
    const handleKakaoCallback = async (code: string) => {
        try {
            const response = await fetch('/user/login/kakao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            // JWT 토큰 저장

        } catch (error) {
            console.error('Login failed:', error);
        }
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
