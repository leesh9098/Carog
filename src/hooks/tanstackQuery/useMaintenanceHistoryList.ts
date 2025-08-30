import { maintenanceHistoryListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useMaintenanceHistoryList() {
    const { data, ...rest } = useQuery({
        queryKey: ['maintenanceHistoryList'],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get('/maintenance/list', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(maintenanceHistoryListSchema), data.data.content);
        },
        retry: false
    })

    return {
        maintenanceHistoryList: data,
        ...rest
    }
}

export function useMaintenanceHistoryListById(id?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['maintenanceHistoryListById', id],
        queryFn: async () => {
            const token = getCookie('token');
            if (!token) return null;

            const { data } = await ax.get(`/maintenance/list/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(maintenanceHistoryListSchema), data.data.content);
        },
        enabled: !!id,
        retry: false
    })

    return {
        maintenanceHistoryListById: data ?? [],
        ...rest
    }
}