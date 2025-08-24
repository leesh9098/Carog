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