import { etcListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useEtcList() {
    const { data, ...rest } = useQuery({
        queryKey: ['etcList'],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get('/etc/list', {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(etcListSchema), data.data.content);
        },
        retry: false
    })

    return {
        etcList: data,
        ...rest
    }
}

export function useEtcListById(id?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['etcListById', id],
        queryFn: async () => {
            const token = getCookie('token');
            if (!token) return null;

            const { data } = await ax.get(`/etc/list/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(etcListSchema), data.data.content);
        },
        enabled: !!id,
        retry: false
    })

    return {
        etcListById: data ?? [],
        ...rest
    }
}