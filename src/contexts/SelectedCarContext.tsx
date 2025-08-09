import { createContext, useContext, useState } from "react";

interface SelectedCarContextType {
    selectedCar: {
        id: number;
        name: string;
        number: string;
        represent: boolean;
    } | null;
    setSelectedCar: (car: {
        id: number;
        name: string;
        number: string;
        represent: boolean;
    } | null) => void;
}

const SelectedCarContext = createContext<SelectedCarContextType>({
    selectedCar: null,
    setSelectedCar: () => {}
});

export const SelectedCarProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedCar, setSelectedCar] = useState<{
        id: number;
        name: string;
        number: string;
        represent: boolean;
    } | null>(null);

    return (
        <SelectedCarContext.Provider value={{
            selectedCar,
            setSelectedCar
        }}>
            {children}
        </SelectedCarContext.Provider>
    );
}

export const useSelectedCar = () => useContext(SelectedCarContext);
