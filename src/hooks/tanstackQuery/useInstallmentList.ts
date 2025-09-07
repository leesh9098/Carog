import { installmentListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useInstallmentList() {
    const { data, ...rest } = useQuery({
        queryKey: ['installmentList'],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get('/installment/list', {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(installmentListSchema), data.data.content);
        },
        retry: false
    })

    return {
        installmentList: data,
        ...rest
    }
}

export function useInstallmentListById(id?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['installmentListById', id],
        queryFn: async () => {
            const token = getCookie('token');
            if (!token) return null;

            const { data } = await ax.get(`/installment/list/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return v.parse(v.array(installmentListSchema), data.data.content);
        },
        enabled: !!id,
        retry: false
    })
    return {
        installmentListById: data ?? [],
        ...rest
    }
}