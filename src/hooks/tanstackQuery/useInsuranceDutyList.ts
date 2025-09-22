import { insuranceDutyListSchema } from "@/constants/carList";
import { ax, getCookie, getInsuranceDutyType } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as v from 'valibot';

export function useInsuranceDutyList(carInfoId?: number) {
    const navigate = useNavigate();

    const { data, ...rest } = useQuery({
        queryKey: ['insuranceDutyList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            try {
                const { data } = await ax.get(`/insurance/list/${carInfoId}`, {
                    params: {
                        sort: "createdAt,desc"
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                return v.parse(v.array(insuranceDutyListSchema), data.data.content);
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
        insuranceDutyList: data ? data.map(insuranceDuty => ({
            ...insuranceDuty,
            type: getInsuranceDutyType(insuranceDuty.type)
        })) : [],
        ...rest
    }
}
