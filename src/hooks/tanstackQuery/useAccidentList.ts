import { accidentListSchema } from "@/constants/carList";
import { ax, getAccidentType, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as v from 'valibot';
import { ExpiredTokenErrorCode } from "@/lib/utils";

export function useAccidentList(carInfoId?: number) {
    const navigate = useNavigate();
    
    const { data, ...rest } = useQuery({
        queryKey: ['accidentList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            try {
                const { data } = await ax.get(`/accident/list/${carInfoId}`, {
                    params: {
                        sort: "createdAt,desc"
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                return v.parse(v.array(accidentListSchema), data.data.content);
            } catch (error: any) {
                console.error(error);
                if (ExpiredTokenErrorCode.includes(error.response.data.code)) {
                    alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                    navigate("/login");
                }
            }
        },
        retry: false,
        enabled: !!carInfoId
    })

    return {
        accidentList: data ? data.map(accident => ({
            ...accident,
            type: getAccidentType(accident.type)
        })) : [],
        ...rest
    }
}
