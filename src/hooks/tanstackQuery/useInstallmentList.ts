import { installmentListSchema } from "@/constants/carList";
import { ax, getCookie } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import * as v from 'valibot';

export function useInstallmentList(carInfoId?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['installmentList', carInfoId],
        queryFn: async () => {
            const token = getCookie('token');

            if (!token) return null;

            const { data } = await ax.get(`/installment/list/${carInfoId}`, {
                params: {
                    sort: "createdAt,desc"
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return v.parse(v.array(installmentListSchema), data.data.content);
        },
        retry: false,
        enabled: !!carInfoId
    })

    return {
        installmentList: data ? data : [],
        ...rest
    }
}
