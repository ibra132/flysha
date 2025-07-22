import { FC, useMemo } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { mappingSeats, rupiahFormat } from "@/lib/utils";
import { FlightColumn } from "./columns-flight";

interface ColumnSeatPriceFlightProps {
  flight: FlightColumn;
}

const ColumnSeatPriceFlight: FC<ColumnSeatPriceFlightProps> = ({ flight }) => {
  const { business, economy, first, totalBusiness, totalEconomy, totalFirst } =
    useMemo(() => mappingSeats(flight.seats), [flight]);

  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>Economy</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary">Harga Ticket: </span>
              {rupiahFormat(flight.price)}
            </div>
            <div className="font-medium">
              <span className="text-primary">Sisa Ticket: </span>
              {economy}/{totalEconomy}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Business</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary">Harga Ticket: </span>
              {rupiahFormat(flight.price + 500000)}
            </div>
            <div className="font-medium">
              <span className="text-primary">Sisa Ticket: </span>
              {business}/{totalBusiness}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <div className="font-medium">
              <span className="text-primary">Harga Ticket: </span>
              {rupiahFormat(flight.price + 750000)}
            </div>
            <div className="font-medium">
              <span className="text-primary">Sisa Ticket: </span>
              {first}/{totalFirst}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColumnSeatPriceFlight;
