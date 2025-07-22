import { TypeSeat } from "@/generated/prisma";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (
  date: Date | string,
  format: string = "DD MMM YYYY HH:mm"
) => {
  if (!date) return "";
  return dayjs(date).format(format);
};

export const generateSeatPerClass = (flightId: string) => {
  const SEAT_CLASS: TypeSeat[] = ["ECONOMY", "BUSINESS", "FIRST"];
  const SEAT_CODE = ["A", "B", "C", "D"];

  const seats: {
    seatNumber: string;
    type: TypeSeat;
    flightId: string;
    isBooked: boolean;
  }[] = [];

  for (const className of SEAT_CLASS) {
    for (const seat of SEAT_CODE) {
      for (let i = 0; i <= 5; i++) {
        seats.push({
          seatNumber: seat + i,
          type: className as TypeSeat,
          flightId,
          isBooked: false,
        });
      }
    }
  }

  return seats;
};
