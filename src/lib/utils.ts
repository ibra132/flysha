import { Airplane, Flight, FlightSeat, TypeSeat } from "@/generated/prisma";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import dayjs from "dayjs";

export type Checkout = {
  id?: string;
  seat?: TypeSeat;
  flightDetail?: Flight & { plane: Airplane };
  seatDetail?: FlightSeat;
};

export const CHECKOUT_KEY = "CHECKOUT_KEY";

export const SEAT_VALUES = {
  ECONOMY: {
    label: "Economy",
    additionalPrice: 0,
  },
  BUSINESS: {
    label: "Business",
    additionalPrice: 500000,
  },
  FIRST: {
    label: "First",
    additionalPrice: 750000,
  },
};

export type SeatValuesType = keyof typeof SEAT_VALUES;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (
  date: Date | string,
  format: string = "DD MMM YYYY HH:mm"
) => {
  if (!date) return "-";
  return dayjs(date).format(format);
};

export const rupiahFormat = (number: number) => {
  if (!number) return "-";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export const objectToParams = (obj: { [key: string]: unknown }) => {
  const queryParams = Object.keys(obj)
    .map((key) => {
      if (obj[key] !== null) {
        return `${key}=${obj[key]}`;
      }

      return "";
    })
    .filter((key) => key !== "")
    .join("&");

  return queryParams;
};

export const mappingSeats = (seats: FlightSeat[]) => {
  const countByType = (type: TypeSeat) =>
    seats.filter((seat) => seat.type === type).length;

  const countNotBooked = (type: TypeSeat) =>
    seats.filter((seat) => seat.type === type && !seat.isBooked).length;

  return {
    totalEconomy: countByType("ECONOMY"),
    totalBusiness: countByType("BUSINESS"),
    totalFirst: countByType("FIRST"),
    economy: countNotBooked("ECONOMY"),
    business: countNotBooked("BUSINESS"),
    first: countNotBooked("FIRST"),
  };
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
