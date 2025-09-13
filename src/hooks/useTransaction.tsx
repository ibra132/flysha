import { User } from "lucia";
import useCheckoutData from "./useCheckoutData";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { SEAT_VALUES, SeatValuesType } from "@/lib/utils";
import axios from "axios";

type Props = {
  user: User | null;
};

const useTransaction = ({ user }: Props) => {
  const { data } = useCheckoutData();

  const [isLoading, setIsLoading] = useState(false);

  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data?.seat]);

  const transactionMutate = useMutation({
    mutationFn: (data: any) =>
      axios.post("/api/transactions/create", data).then((res) => res.data),
  });

  const payTransaction = async () => {
    if (!data && !user) {
      return null;
    }

    const totalPrice = Number(
      data?.flightDetail?.price ?? 0 + selectedSeat.additionalPrice
    );

    const bodyData = {
      bookingDate: new Date(),
      price: totalPrice,
      flightId: data?.flightDetail?.id,
      seatId: data?.seatDetail?.id,
      customerId: user?.id,
      departureCityCode: data?.flightDetail?.departureCityCode,
      destinationCityCode: data?.flightDetail?.destinationCityCode,
    };

    try {
      setIsLoading(true);
      const transaction = await transactionMutate.mutateAsync(bodyData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    payTransaction,
    isLoading,
  };
};

export default useTransaction;
