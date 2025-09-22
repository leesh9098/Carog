import { etcListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as v from 'valibot';

export function useEtcList(carInfoId?: number) {
    const navigate = useNavigate();
    
    const { data, ...rest } = useQuery({
        queryKey: ['etcList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;
            
            try {
                const { data } = await ax.get(`/etc/list/${carInfoId}`, {
                    params: {
                        sort: "createdAt,desc"
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                return v.parse(v.array(etcListSchema), data.data.content);
            } catch (error: any) {
                console.error(error);
                if (error.response.data.code === "EA0006") {
                    alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                    navigate("/login");
                }
            }
        },
        retry: false,
        enabled: !!carInfoId
    })

    return {
        etcList: data ? data : [],
        ...rest
    }
}
