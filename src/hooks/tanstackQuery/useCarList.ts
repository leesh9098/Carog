import { carListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useCarList() {
    const { data, ...rest } = useQuery({
        queryKey: ['carList'],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get('/car/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(carListSchema), data.data.content);
        },
        retry: false
    })

    return {
        cars: data,
        ...rest
    }
}