import { accidentListSchema } from "@/constants/carList";
import { ax, getAccidentType, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useAccidentList(carInfoId?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['accidentList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get(`/accident/list/${carInfoId}`, {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(accidentListSchema), data.data.content);
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
