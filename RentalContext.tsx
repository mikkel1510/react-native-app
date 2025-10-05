import { createContext, ReactNode, useContext, useState } from "react";

interface RentalContextType {
    rentedCar: number | null;
    setRentedCar: (carId: number | null) => void
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider = ({ children } : { children: ReactNode}) => {
    const [rentedCar, setRentedCar] = useState<number | null>(null);

    return (
        <RentalContext.Provider value={{ rentedCar, setRentedCar }}>
            {children}
        </RentalContext.Provider>
    );
};

export const useRental = () => {
    const context = useContext(RentalContext);
    if (!context) throw new Error("useRental must be used within a RentalProvider");
    return context;
}