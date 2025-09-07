import { accidentListSchema } from "@/constants/carList";
import { ax, getAccidentType, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useAccidentList() {
    const { data, ...rest } = useQuery({
        queryKey: ['accidentList'],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get('/accident/list', {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(accidentListSchema), data.data.content);
        },
        retry: false
    })

    return {
        accidentList: data?.map(accident => ({
            ...accident,
            type: getAccidentType(accident.type)
        })),
        ...rest
    }
}

export function useAccidentListById(id?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['accidentListById', id],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get(`/accident/list/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(accidentListSchema), data.data.content);
        },
        enabled: !!id,
        retry: false
    })

    return {
        accidentListById: data ?? [],
        ...rest
    }
}