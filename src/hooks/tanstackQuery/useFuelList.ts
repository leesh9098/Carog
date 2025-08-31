import { fuelListSchema } from "@/constants/carList";
import { ax, getCookie, getFuelType } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useFuelList() {
    const { data, ...rest } = useQuery({
        queryKey: ['fuelList'],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get('/oil/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(fuelListSchema), data.data.content);
        },
        retry: false
    })

    return {
        fuelList: data?.map(fuel => ({
            ...fuel,
            type: getFuelType(fuel.type)
        })),
        ...rest
    }
}

export function useFuelListById(id?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['fuelListById', id],
        queryFn: async () => {
            const token = getCookie('token');
            if (!token) return null;

            const { data } = await ax.get(`/oil/list/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(fuelListSchema), data.data.content);
        },
        enabled: !!id,
        retry: false
    })

    return {
        fuelListById: data ?? [],
        ...rest
    }
}