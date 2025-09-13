import { ax } from "@/lib/utils";
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

export default function KakaoLogin() {

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const navigate = useNavigate();

    const handleKakaoCallback = async (code: string) => {
        try {
            const response = await ax.post('/auth/login/kakao', {
                code,
                redirectUri: `${window.location.origin}/auth/login/kakao`
            });
            document.cookie = `token=${response.data.data.token}; path=/; max-age=43200;`;
            window.location.href = '/';
        } catch (error) {
            console.error('Login failed:', error);
            navigate('/login');
        }
    };

    useEffect(() => {
        (async () => {
            if (code) {
                await handleKakaoCallback(code);
            } else {
                window.location.href = '/';
            }
        })();
    }, [code]);

    return (
        <></>
    )
}
