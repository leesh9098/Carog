import { parkingFeeListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useParkingFeeList(carInfoId?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['parkingFeeList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get(`/parking/list/${carInfoId}`, {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(parkingFeeListSchema), data.data.content);
        },
        retry: false,
        enabled: !!carInfoId
    })

    return {
        parkingFeeList: data ? data : [],
        ...rest
    }
}
