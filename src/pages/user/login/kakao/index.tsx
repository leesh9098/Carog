import { ax } from "@/lib/utils";
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

export default function KakaoLogin() {

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const navigate = useNavigate();

    const handleKakaoCallback = async (code: string) => {
        try {
            const response = await ax.post('/user/login/kakao', { code });
            document.cookie = `token=${response.data.data.token}; path=/; max-age=3600;`;
            window.location.href = '/';
        } catch (error) {
            console.error('Login failed:', error);
            navigate('/login');
        }
    };

    useEffect(() => {
        if (code) {
            handleKakaoCallback(code);
        } else {
            window.location.href = '/';
        }
    }, []);

    return (
        <></>
    )
}
