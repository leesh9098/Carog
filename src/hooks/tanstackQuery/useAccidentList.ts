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