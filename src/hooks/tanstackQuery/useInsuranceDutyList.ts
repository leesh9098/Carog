import { insuranceDutyListSchema } from "@/constants/carList";
import { ax, getCookie, getInsuranceDutyType } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useInsuranceDutyList(carInfoId?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['insuranceDutyList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get(`/insurance/list/${carInfoId}`, {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(insuranceDutyListSchema), data.data.content);
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
