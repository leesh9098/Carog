import { carListSchema } from "@/constants/carList";
import { ax, ExpiredTokenErrorCode, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as v from 'valibot';

export function useCarList() {
    const navigate = useNavigate();
    
    const { data, ...rest } = useQuery({
        queryKey: ['carList'],
        queryFn: async () => {
            const token = getCookie('token');
            
            if (!token) return null;

            try {
                const { data } = await ax.get('/car/list', {
                    params: {
                        sort: "createdAt,desc"
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                return v.parse(v.optional(v.array(carListSchema)), data.data);
            } catch (error: any) {
                console.error(error);
                if (ExpiredTokenErrorCode.includes(error.response.data.code)) {
                    alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                    document.cookie = `token=; path=/; max-age=0;`;
                    navigate("/login");
                }
            }
        },
        retry: false
    })

    return {
        cars: data ? data : [],
        ...rest
    }
}