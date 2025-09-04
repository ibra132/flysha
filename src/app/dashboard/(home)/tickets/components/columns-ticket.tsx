"use client";

import { Flight, FlightSeat, Ticket, User } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import ColumnRouteFlight from "../../flights/components/coulmn-route-flight";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TicketColumn = Ticket & {
  flight: Flight;
  customer: User;
  seat: FlightSeat;
};

export const columns: ColumnDef<TicketColumn>[] = [
  {
    accessorKey: "customerId",
    header: "Nama Penumpang",
    cell: ({ row }) => {
      const ticket = row.original;

      return ticket.customer.name;
    },
  },
  {
    accessorKey: "flightId",
    header: "Detail Penerbangan",
    cell: ({ row }) => {
      const ticket = row.original;

      return <ColumnRouteFlight flight={ticket.flight} />;
    },
  },
  {
    accessorKey: "seatId",
    header: "Nomor Kursi",
    cell: ({ row }) => {
      const ticket = row.original;

      return <Badge>{ticket.seatId}</Badge>;
    },
  },
  {
    id: "detail_transaction",
    header: "Status Pembayaran",
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <Badge
          className={cn(
            ticket.status === "SUCCESS"
              ? "bg-green-500"
              : ticket.status === "PENDING"
              ? "bg-yellow-500"
              : "bg-red-500"
          )}
        >
          {ticket.status}
        </Badge>
      );
    },
  },
];
