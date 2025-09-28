import { ax, ExpiredTokenErrorCode, getCookie } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SessionContextType {
    isLoggedIn: boolean;
    user: {
        nickname: string;
        email: string;
    } | null;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUser: (user: {
        nickname: string;
        email: string;
    } | null) => void;
}

const SessionContext = createContext<SessionContextType>({
    isLoggedIn: false,
    user: null,
    setIsLoggedIn: () => {},
    setUser: () => {}
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<{
        nickname: string;
        email: string;
    } | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            navigate("/");
        }
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;

        const token = getCookie('token');

        (async () => {
            try {
                const { data } = await ax.get("/user/profile", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUser(data.data);
            } catch (error: any) {
                console.error(error);
                if (ExpiredTokenErrorCode.includes(error.response.data.code)) {
                    document.cookie = `token=; path=/; max-age=0;`;
                    setIsLoggedIn(false);
                    setUser(null);
                    alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                    document.cookie = `token=; path=/; max-age=0;`;
                    navigate("/login");
                }
            }
        })();
    }, [isLoggedIn]);

    return (
        <SessionContext.Provider value={{
            isLoggedIn,
            user,
            setIsLoggedIn,
            setUser
        }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);