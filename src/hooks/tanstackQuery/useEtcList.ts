import { etcListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useEtcList(carInfoId?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['etcList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get(`/etc/list/${carInfoId}`, {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(etcListSchema), data.data.content);
        },
        retry: false,
        enabled: !!carInfoId
    })

    return {
        etcList: data ? data : [],
        ...rest
    }
}
