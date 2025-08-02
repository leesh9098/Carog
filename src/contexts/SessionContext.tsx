import { ax, getCookie } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

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

export const SessionContext = createContext<SessionContextType>({
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

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
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
            } catch (error) {
                console.error(error);
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