import { insuranceDutyListSchema } from "@/constants/carList";
import { ax, getCookie, getInsuranceDutyType } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useInsuranceDutyList() {
    const { data, ...rest } = useQuery({
        queryKey: ['insuranceDutyList'],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get('/insurance/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(insuranceDutyListSchema), data.data.content);
        },
        retry: false
    })

    return {
        insuranceDutyList: data?.map(insuranceDuty => ({
            ...insuranceDuty,
            type: getInsuranceDutyType(insuranceDuty.type)
        })),
        ...rest
    }
}

export function useInsuranceDutyListById(id?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['insuranceDutyListById', id],
        queryFn: async () => {
            const token = getCookie('token');
            if (!token) return null;

            const { data } = await ax.get(`/insurance/list/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return v.parse(v.array(insuranceDutyListSchema), data.data.content);
        },
        enabled: !!id,
        retry: false
    })

    return {
        insuranceDutyListById: data ?? [],
        ...rest
    }
}