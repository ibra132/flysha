import { FC } from "react";
import { Flight } from "@/generated/prisma";
import { dateFormat } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ColumnRouteFlightProps {
  flight: Flight;
}

const ColumnRouteFlight: FC<ColumnRouteFlightProps> = ({ flight }) => {
  return (
    <div className="flex gap-5  items-center">
      <div className="text-center">
        <div className="font-bold">{flight.departureCityCode}</div>
        <div className="font-medium">{flight.departureCity}</div>
        <div className="text-xs to-gray-500">
          {dateFormat(flight.departureDate)}
        </div>
      </div>
      <ArrowRight />
      <div className="text-center">
        <div className="font-bold">{flight.destinationCityCode}</div>
        <div className="font-medium">{flight.destinationCity}</div>
        <div className="text-xs to-gray-500">
          {dateFormat(flight.arrivalDate)}
        </div>
      </div>
    </div>
  );
};

export default ColumnRouteFlight;
