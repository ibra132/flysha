"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Airplane, Flight, FlightSeat } from "@/generated/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteAirplane from "../../airplanes/components/delete-airplane";
import Image from "next/image";
import { getFileUrl } from "@/lib/supabase";
import ColumnRouteFlight from "./coulmn-route-flight";
import ColumnSeatPriceFlight from "./column-seatprice-flight";

export type FlightColumn = Flight & {
  plane: Airplane;
  seats: FlightSeat[];
};

export const columns: ColumnDef<FlightColumn>[] = [
  {
    accessorKey: "planeId",
    header: "Pesawat",
    cell: ({ row }) => {
      const flight = row.original;

      const imageSrc = getFileUrl(flight.plane.image);

      return (
        <div className="flex items-center gap-5">
          <Image
            src={imageSrc}
            alt="Image airplane"
            width={120}
            height={120}
            className="rounded-xl"
          />
          <div className="font-bold">{flight.plane.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "departureCity",
    header: "Rute",
    cell: ({ row }) => {
      const flight = row.original;

      return <ColumnRouteFlight flight={flight} />;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const flight = row.original;

      return <ColumnSeatPriceFlight flight={flight} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const flight = row.original;

      return (
        <div className="inline-flex gap-5 items-center">
          <Button variant={"secondary"} asChild size={"sm"}>
            <Link href={`/dashboard/flights/edit/${flight.id}`}>
              <Pencil className="mr-2 w-4 h-4" />
              Edit
            </Link>
          </Button>
          <DeleteAirplane id={flight.id} />
        </div>
      );
    },
  },
];
