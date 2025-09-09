"use client";

import useCheckoutData from "@/hooks/useCheckoutData";
import SeatItem from "./seat-item";
import { FlightSeat } from "@/generated/prisma";
import { useMemo } from "react";

interface SeatListProps {
  seats: FlightSeat[];
}

export default function SeatList({ seats }: SeatListProps) {
  const checkout = useCheckoutData();

  const { seatA, seatB, seatC, seatD } = useMemo(() => {
    const rawSeats = seats.filter((seat) => seat.type === checkout.data?.seat);

    const seatA = rawSeats.filter((seat) => seat.seatNumber.startsWith("A"));
    const seatB = rawSeats.filter((seat) => seat.seatNumber.startsWith("B"));
    const seatC = rawSeats.filter((seat) => seat.seatNumber.startsWith("C"));
    const seatD = rawSeats.filter((seat) => seat.seatNumber.startsWith("D"));

    return { seatA, seatB, seatC, seatD };
  }, [checkout, seats]);

  return (
    <form className="flex flex-row justify-between">
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          {seatA.map((seat, index) => (
            <SeatItem seat={seat} key={index} />
          ))}
        </div>
        <div className="flex flex-col gap-[19px]">
          {seatB.map((seat, index) => (
            <SeatItem seat={seat} key={index} />
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          {seatC.map((seat, index) => (
            <SeatItem seat={seat} key={index} />
          ))}
        </div>
        <div className="flex flex-col gap-[19px]">
          {seatD.map((seat, index) => (
            <SeatItem seat={seat} key={index} />
          ))}
        </div>
      </div>
    </form>
  );
}
