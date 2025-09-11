import { fuelListSchema } from "@/constants/carList";
import { ax, getCookie, getFuelType } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useFuelList(carInfoId?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['fuelList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get(`/oil/list/${carInfoId}`, {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(fuelListSchema), data.data.content);
        },
        retry: false,
        enabled: !!carInfoId
    })

    return {
        fuelList: data ? data.map(fuel => ({
            ...fuel,
            type: getFuelType(fuel.type)
        })) : [],
        ...rest
    }
}
