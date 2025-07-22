import { Flight } from "@/generated/prisma";
import { FC } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ColumnSeatPriceFlightProps {
  flight: Flight;
}

const ColumnSeatPriceFlight: FC<ColumnSeatPriceFlightProps> = ({ flight }) => {
  console.log(flight);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColumnSeatPriceFlight;
