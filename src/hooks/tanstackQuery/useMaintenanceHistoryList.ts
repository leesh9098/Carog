import { maintenanceHistoryListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useMaintenanceHistoryList(carInfoId?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['maintenanceHistoryList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get(`/maintenance/list/${carInfoId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(maintenanceHistoryListSchema), data.data.content);
        },
        retry: false,
        enabled: !!carInfoId
    })

    return {
        maintenanceHistoryList: data ? data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : [],
        ...rest
    }
}
