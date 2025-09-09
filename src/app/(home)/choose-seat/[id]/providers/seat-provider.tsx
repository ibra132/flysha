import { FlightSeat } from "@/generated/prisma";
import { createContext, ReactNode, useState } from "react";

interface SeatProviderProps {
  children: ReactNode;
}

export type SeatContextType = {
  seat: FlightSeat | null;
  setSelectedSeat: (seat: FlightSeat) => void;
};

export const SeatContext = createContext<SeatContextType | null>(null);

export function SeatProvider({ children }: SeatProviderProps) {
  const [seat, setSeat] = useState<FlightSeat | null>(null);

  const setSelectedSeat = (seat: FlightSeat) => {
    setSeat(seat);
  };

  return (
    <SeatContext.Provider value={{ seat, setSelectedSeat }}>
      {children}
    </SeatContext.Provider>
  );
}
