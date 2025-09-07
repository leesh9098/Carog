import { parkingFeeListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useParkingFeeList() {
    const { data, ...rest } = useQuery({
        queryKey: ['parkingFeeList'],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get('/parking/list', {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(parkingFeeListSchema), data.data.content);
        },
        retry: false
    })

    return {
        parkingFeeList: data,
        ...rest
    }
}

export function useParkingFeeListById(id?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['parkingFeeListById', id],
        queryFn: async () => {
            const token = getCookie('token');
            if (!token) return null;

            const { data } = await ax.get(`/parking/list/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return v.parse(v.array(parkingFeeListSchema), data.data.content);
        },
        enabled: !!id,
        retry: false
    })

    return {
        parkingFeeListById: data ?? [],
        ...rest
    }
}