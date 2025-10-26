import { useCarList } from "@/hooks/tanstackQuery/useCarList";
import { useNavigate } from "react-router-dom";

export function useExistCar(to: string) {
    const navigate = useNavigate();
    const { cars, isLoading } = useCarList();
    
    const handleCheckExistCar = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isLoading && cars.length === 0) {
            e.preventDefault();
            const addCar = window.confirm("등록된 차량이 없습니다. 차량을 등록하시겠습니까?");
            if (addCar) {
                navigate("/my/cars/add", { replace: true });
            } else {
                return;
            }
        } else {
            navigate(to);
        }
    }

    return {
        handleCheckExistCar
    }
}
